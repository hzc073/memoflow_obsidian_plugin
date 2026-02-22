import {
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  normalizePath,
} from "obsidian";
import * as http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import * as crypto from "node:crypto";
import * as os from "node:os";
import * as path from "node:path";
import { Buffer } from "node:buffer";

import bonjour from "bonjour";
import Busboy from "busboy";
import QRCode from "qrcode";

interface MemoFlowBridgeSettings {
  port: number;
  inboxFolder: string;
  attachmentsFolder: string;
  pairCodeTtlSeconds: number;
  maxFileSizeMB: number;
  advertisedName: string;
}

interface AuthorizedDevice {
  deviceName: string;
  createdAt: number;
  lastSeenAt: number;
}

interface PersistedData {
  settings?: Partial<MemoFlowBridgeSettings>;
  authorizedDevices?: Record<string, AuthorizedDevice>;
}

interface UploadFile {
  fieldName: string;
  fileName: string;
  mimeType: string;
  data: Buffer;
}

interface AttachmentWriteResult {
  originalName: string;
  vaultPath: string;
  markdown: string;
}

const DEFAULT_SETTINGS: MemoFlowBridgeSettings = {
  port: 3000,
  inboxFolder: "Inbox",
  attachmentsFolder: "attachments",
  pairCodeTtlSeconds: 120,
  maxFileSizeMB: 200,
  advertisedName: "",
};

const BRIDGE_API_VERSION = "bridge-v1";

export default class MemoFlowSyncBridgePlugin extends Plugin {
  settings: MemoFlowBridgeSettings = { ...DEFAULT_SETTINGS };
  authorizedDevices: Record<string, AuthorizedDevice> = {};

  private server: http.Server | null = null;
  private bonjourInstance: any = null;
  private bonjourService: any = null;

  private currentPairCode = "";
  private pairCodeExpiresAt = 0;

  async onload(): Promise<void> {
    await this.loadPluginData();
    this.regeneratePairCode(false);

    this.addSettingTab(new MemoFlowBridgeSettingTab(this.app, this));

    this.addCommand({
      id: "memoflow-bridge-show-pair-qr",
      name: "显示配对二维码 / Show Pairing QR",
      callback: () => {
        const modal = new PairQrModal(this.app, this);
        modal.open();
      },
    });

    this.addCommand({
      id: "memoflow-bridge-regenerate-pair-code",
      name: "重置配对码 / Regenerate Pairing Code",
      callback: async () => {
        this.regeneratePairCode(true);
        await this.persistPluginData();
      },
    });

    this.addRibbonIcon(
      "refresh-cw",
      "MemoFlow 同步 / MemoFlow Sync",
      async () => {
        if (!this.isPairCodeAlive()) {
          this.regeneratePairCode(false);
          await this.persistPluginData();
        }
        new PairQrModal(this.app, this).open();
      },
    );

    await this.startBridge();
  }

  async onunload(): Promise<void> {
    await this.stopBridge();
  }

  async restartBridge(): Promise<void> {
    await this.stopBridge();
    await this.startBridge();
  }

  getPairUri(): string {
    const host = this.resolveLanAddress();
    const serverName = this.resolveAdvertisedName();
    const params = new URLSearchParams({
      host,
      port: String(this.settings.port),
      pairCode: this.currentPairCode,
      api: BRIDGE_API_VERSION,
      name: serverName,
    });
    return `memoflow://pair?${params.toString()}`;
  }

  getCurrentPairCode(): string {
    return this.currentPairCode;
  }

  getPairCodeExpiresAt(): number {
    return this.pairCodeExpiresAt;
  }

  isPairCodeAlive(nowMs: number = Date.now()): boolean {
    return nowMs <= this.pairCodeExpiresAt;
  }

  regeneratePairCode(showNotice: boolean): void {
    this.currentPairCode = this.randomToken(6);
    this.pairCodeExpiresAt =
      Date.now() + this.settings.pairCodeTtlSeconds * 1000;
    if (showNotice) {
      new Notice(
        `配对码已重置（${this.settings.pairCodeTtlSeconds} 秒后过期） / Pair code regenerated (${this.settings.pairCodeTtlSeconds}s).`,
      );
    }
  }

  private async startBridge(): Promise<void> {
    await this.startHttpServer();
    this.startMdns();
    new Notice(
      `MemoFlow 同步桥已启动（端口 ${this.settings.port}） / MemoFlow Sync Bridge started on port ${this.settings.port}.`,
    );
  }

  private async stopBridge(): Promise<void> {
    await this.stopHttpServer();
    this.stopMdns();
  }

  private async startHttpServer(): Promise<void> {
    this.server = http.createServer((req, res) => {
      void this.handleRequest(req, res);
    });

    await new Promise<void>((resolve, reject) => {
      const onError = (error: Error): void => {
        reject(error);
      };
      this.server?.once("error", onError);
      this.server?.listen(this.settings.port, "0.0.0.0", () => {
        this.server?.off("error", onError);
        resolve();
      });
    });

    const address = this.server.address();
    if (address && typeof address !== "string") {
      const actualPort = (address as AddressInfo).port;
      if (actualPort !== this.settings.port) {
        this.settings.port = actualPort;
        await this.persistPluginData();
      }
    }
  }

  private async stopHttpServer(): Promise<void> {
    if (!this.server) return;
    const server = this.server;
    this.server = null;
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  }

  startMdns(): void {
    this.stopMdns();
    try {
      this.bonjourInstance = bonjour();
      this.bonjourService = this.bonjourInstance.publish({
        name: this.resolveAdvertisedName(),
        type: "memoflow",
        protocol: "tcp",
        port: this.settings.port,
        txt: {
          ver: "1",
          api: BRIDGE_API_VERSION,
          name: this.resolveAdvertisedName(),
          pair: "1",
          host: this.resolveLanAddress(),
        },
      });
    } catch (error) {
      new Notice(`mDNS 启动失败 / mDNS start failed: ${String(error)}`);
    }
  }

  private stopMdns(): void {
    try {
      if (this.bonjourService) {
        this.bonjourService.stop();
      }
      if (this.bonjourInstance) {
        this.bonjourInstance.unpublishAll();
        this.bonjourInstance.destroy();
      }
    } catch (_) {
      // Ignore cleanup errors.
    }
    this.bonjourService = null;
    this.bonjourInstance = null;
  }

  private async handleRequest(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const method = (req.method ?? "GET").toUpperCase();
    const url = new URL(req.url ?? "/", "http://127.0.0.1");

    try {
      if (method === "GET" && url.pathname === "/bridge/v1/health") {
        this.writeJson(res, 200, {
          ok: true,
          apiVersion: BRIDGE_API_VERSION,
          port: this.settings.port,
          pairCodeExpiresAt: this.pairCodeExpiresAt,
          serverName: this.resolveAdvertisedName(),
        });
        return;
      }

      if (method === "POST" && url.pathname === "/bridge/v1/pair/confirm") {
        await this.handlePairConfirm(req, res);
        return;
      }

      if (method === "POST" && url.pathname === "/bridge/v1/memo/upload") {
        await this.handleMemoUpload(req, res);
        return;
      }

      this.writeJson(res, 404, {
        ok: false,
        error: "NOT_FOUND",
      });
    } catch (error) {
      this.writeJson(res, 500, {
        ok: false,
        error: "INTERNAL_ERROR",
        message: String(error),
      });
    }
  }

  private async handlePairConfirm(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const payload = await this.readJsonBody(req, 64 * 1024);
    const pairCode = this.readString(payload, "pairCode");
    const deviceName =
      this.readString(payload, "deviceName") || "MemoFlow Mobile";

    if (!pairCode) {
      this.writeJson(res, 400, {
        ok: false,
        error: "PAIR_CODE_REQUIRED",
      });
      return;
    }

    if (Date.now() > this.pairCodeExpiresAt || pairCode !== this.currentPairCode) {
      this.writeJson(res, 401, {
        ok: false,
        error: "PAIR_CODE_INVALID",
      });
      return;
    }

    const token = crypto.randomBytes(24).toString("hex");
    this.authorizedDevices[token] = {
      deviceName,
      createdAt: Date.now(),
      lastSeenAt: Date.now(),
    };
    await this.persistPluginData();

    this.writeJson(res, 200, {
      ok: true,
      token,
      serverName: this.resolveAdvertisedName(),
      apiVersion: BRIDGE_API_VERSION,
    });
  }

  private async handleMemoUpload(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const token = this.readBearerToken(req);
    const device = token ? this.authorizedDevices[token] : undefined;
    if (!device) {
      this.writeJson(res, 401, {
        ok: false,
        error: "TOKEN_INVALID",
      });
      return;
    }

    const { fields, files } = await this.readMultipartForm(req);
    const metaRaw = fields.meta ?? "";
    if (!metaRaw.trim()) {
      this.writeJson(res, 400, {
        ok: false,
        error: "META_REQUIRED",
      });
      return;
    }

    let meta: Record<string, unknown>;
    try {
      const decoded = JSON.parse(metaRaw);
      if (!decoded || typeof decoded !== "object") {
        throw new Error("meta should be an object");
      }
      meta = decoded as Record<string, unknown>;
    } catch (error) {
      this.writeJson(res, 400, {
        ok: false,
        error: "META_INVALID",
        message: String(error),
      });
      return;
    }

    const result = await this.writeMemoToVault(meta, files);

    device.lastSeenAt = Date.now();
    await this.persistPluginData();

    this.writeJson(res, 200, {
      ok: true,
      memoPath: result.memoPath,
      attachments: result.attachments,
    });
  }

  private async writeMemoToVault(
    meta: Record<string, unknown>,
    files: UploadFile[],
  ): Promise<{ memoPath: string; attachments: AttachmentWriteResult[] }> {
    const content = this.readString(meta, "content");
    const createdAt = this.parseTimestamp(this.readString(meta, "createdAt"));

    const inboxFolder = normalizePath(this.settings.inboxFolder || "Inbox");
    const attachmentsFolder = normalizePath(
      this.settings.attachmentsFolder || "attachments",
    );

    await this.ensureFolderExists(inboxFolder);
    await this.ensureFolderExists(attachmentsFolder);

    const writtenAttachments: AttachmentWriteResult[] = [];
    for (const file of files) {
      const writeResult = await this.writeAttachment(attachmentsFolder, file);
      writtenAttachments.push(writeResult);
    }

    const attachmentLines = writtenAttachments.map((it) => it.markdown);
    const bodyLines: string[] = [];
    if (content.trim().length > 0) {
      bodyLines.push(content.trimEnd());
    }
    if (attachmentLines.length > 0) {
      if (bodyLines.length > 0) {
        bodyLines.push("");
      }
      bodyLines.push(...attachmentLines);
    }

    const fileName = `${this.formatTimestampForFile(createdAt)}-${this.randomToken(3)}.md`;
    const memoPath = await this.allocateUniquePath(inboxFolder, fileName);
    const markdown = `${bodyLines.join("\n")}\n`;
    await this.app.vault.adapter.write(memoPath, markdown);

    return { memoPath, attachments: writtenAttachments };
  }

  private async writeAttachment(
    attachmentsFolder: string,
    file: UploadFile,
  ): Promise<AttachmentWriteResult> {
    const originalName = file.fileName.trim() || "file";
    const hash = crypto.createHash("sha256").update(file.data).digest("hex");
    const parsed = path.parse(originalName);
    const safeBase = this.sanitizeFileStem(parsed.name || "file");
    const extension = this.resolveExtension(file.fileName, file.mimeType);
    const fileName = `${hash.slice(0, 12)}_${safeBase}${extension}`;
    const vaultPath = await this.allocateUniquePath(attachmentsFolder, fileName);
    await this.app.vault.adapter.writeBinary(vaultPath, this.toArrayBuffer(file.data));

    const mimeType = file.mimeType.toLowerCase();
    const isEmbed =
      mimeType.startsWith("image/") ||
      mimeType.startsWith("video/") ||
      mimeType.startsWith("audio/");
    const markdown = isEmbed ? `![[${vaultPath}]]` : `[[${vaultPath}]]`;

    return {
      originalName,
      vaultPath,
      markdown,
    };
  }

  private async readMultipartForm(
    req: IncomingMessage,
  ): Promise<{ fields: Record<string, string>; files: UploadFile[] }> {
    return await new Promise((resolve, reject) => {
      const fields: Record<string, string> = {};
      const files: UploadFile[] = [];
      const maxBytes = this.settings.maxFileSizeMB * 1024 * 1024;
      let finalError: Error | null = null;

      const busboy = Busboy({
        headers: req.headers,
        limits: {
          fileSize: maxBytes,
          files: 32,
          fields: 64,
        },
      });

      busboy.on(
        "file",
        (
          fieldName: string,
          stream: NodeJS.ReadableStream,
          info: { filename: string; mimeType: string },
        ) => {
          const chunks: Buffer[] = [];
          stream.on("data", (chunk: Buffer | string) => {
            if (finalError) return;
            chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
          });
          stream.on("limit", () => {
            finalError = new Error(
              `File exceeds max size (${this.settings.maxFileSizeMB}MB).`,
            );
          });
          stream.on("end", () => {
            if (finalError) return;
            files.push({
              fieldName,
              fileName: info.filename ?? "file",
              mimeType: info.mimeType ?? "application/octet-stream",
              data: Buffer.concat(chunks),
            });
          });
        },
      );

      busboy.on("field", (fieldName: string, value: string) => {
        fields[fieldName] = value;
      });

      busboy.on("error", (error: Error) => {
        reject(error);
      });

      busboy.on("finish", () => {
        if (finalError) {
          reject(finalError);
          return;
        }
        resolve({ fields, files });
      });

      req.pipe(busboy);
    });
  }

  private async readJsonBody(
    req: IncomingMessage,
    maxBytes: number,
  ): Promise<Record<string, unknown>> {
    const chunks: Buffer[] = [];
    let total = 0;

    await new Promise<void>((resolve, reject) => {
      req.on("data", (chunk: Buffer | string) => {
        const buf = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
        total += buf.length;
        if (total > maxBytes) {
          reject(new Error("Request body too large"));
          req.destroy();
          return;
        }
        chunks.push(buf);
      });
      req.on("end", () => resolve());
      req.on("error", (error) => reject(error));
    });

    const raw = Buffer.concat(chunks).toString("utf8").trim();
    if (!raw) return {};
    const data = JSON.parse(raw);
    if (data && typeof data === "object") {
      return data as Record<string, unknown>;
    }
    throw new Error("JSON payload should be an object");
  }

  private writeJson(
    res: ServerResponse,
    statusCode: number,
    body: Record<string, unknown>,
  ): void {
    const text = JSON.stringify(body);
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(text);
  }

  private readString(payload: Record<string, unknown>, key: string): string {
    const value = payload[key];
    if (typeof value === "string") {
      return value.trim();
    }
    return "";
  }

  private readBearerToken(req: IncomingMessage): string {
    const auth = req.headers.authorization;
    if (!auth || typeof auth !== "string") return "";
    const match = auth.match(/^Bearer\s+(.+)$/i);
    if (!match) return "";
    return match[1]?.trim() ?? "";
  }

  private parseTimestamp(value: string): Date {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      return new Date();
    }
    return new Date(parsed);
  }

  private formatTimestampForFile(date: Date): string {
    const y = date.getFullYear().toString().padStart(4, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    const ss = date.getSeconds().toString().padStart(2, "0");
    return `${y}-${m}-${d}-${hh}${mm}${ss}`;
  }

  private sanitizeFileStem(value: string): string {
    const normalized = value
      .replace(/[\\/:*?"<>|]/g, "_")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .trim();
    if (!normalized) return "file";
    return normalized.slice(0, 64);
  }

  private resolveExtension(fileName: string, mimeType: string): string {
    const ext = path.extname(fileName).toLowerCase().trim();
    if (ext) return ext;
    const mime = mimeType.toLowerCase();
    const map: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "image/webp": ".webp",
      "video/mp4": ".mp4",
      "video/quicktime": ".mov",
      "audio/mpeg": ".mp3",
      "audio/mp4": ".m4a",
      "application/pdf": ".pdf",
    };
    return map[mime] ?? ".bin";
  }

  private async allocateUniquePath(folder: string, fileName: string): Promise<string> {
    const parsed = path.parse(fileName);
    let candidate = normalizePath(`${folder}/${fileName}`);
    let index = 1;
    while (await this.app.vault.adapter.exists(candidate)) {
      candidate = normalizePath(
        `${folder}/${parsed.name}-${index}${parsed.ext}`,
      );
      index += 1;
    }
    return candidate;
  }

  private async ensureFolderExists(folderPath: string): Promise<void> {
    const normalized = normalizePath(folderPath.trim());
    if (!normalized || normalized === ".") return;

    const segments = normalized.split("/").filter((segment) => segment.length > 0);
    let current = "";
    for (const segment of segments) {
      current = current ? `${current}/${segment}` : segment;
      const exists = await this.app.vault.adapter.exists(current);
      if (exists) continue;
      try {
        await this.app.vault.createFolder(current);
      } catch (_) {
        // Another writer may have created this folder.
      }
    }
  }

  private toArrayBuffer(buffer: Buffer): ArrayBuffer {
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
  }

  private resolveLanAddress(): string {
    const interfaces = os.networkInterfaces();
    for (const addresses of Object.values(interfaces)) {
      if (!addresses) continue;
      for (const item of addresses) {
        if (!item) continue;
        if (item.internal) continue;
        const family = typeof item.family === "string" ? item.family : "";
        if (family !== "IPv4") continue;
        const address = item.address.trim();
        if (!address) continue;
        return address;
      }
    }
    return "127.0.0.1";
  }

  private resolveAdvertisedName(): string {
    const configured = this.settings.advertisedName.trim();
    if (configured) return configured;
    return `MemoFlow-${os.hostname()}`;
  }

  private randomToken(bytes: number): string {
    return crypto.randomBytes(bytes).toString("hex");
  }

  parsePositiveInt(
    raw: string,
    fallback: number,
    min: number,
    max: number,
  ): number {
    const parsed = Number.parseInt(raw.trim(), 10);
    if (!Number.isFinite(parsed)) return fallback;
    if (parsed < min || parsed > max) return fallback;
    return parsed;
  }

  private async loadPluginData(): Promise<void> {
    const raw = (await this.loadData()) as PersistedData | null;
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...(raw?.settings ?? {}),
    };
    this.settings.port = this.parsePositiveInt(
      String(this.settings.port),
      DEFAULT_SETTINGS.port,
      1,
      65535,
    );
    this.settings.pairCodeTtlSeconds = this.parsePositiveInt(
      String(this.settings.pairCodeTtlSeconds),
      DEFAULT_SETTINGS.pairCodeTtlSeconds,
      30,
      86400,
    );
    this.settings.maxFileSizeMB = this.parsePositiveInt(
      String(this.settings.maxFileSizeMB),
      DEFAULT_SETTINGS.maxFileSizeMB,
      1,
      2048,
    );
    this.authorizedDevices = raw?.authorizedDevices ?? {};
  }

  async persistPluginData(): Promise<void> {
    const data: PersistedData = {
      settings: this.settings,
      authorizedDevices: this.authorizedDevices,
    };
    await this.saveData(data);
  }
}

class MemoFlowBridgeSettingTab extends PluginSettingTab {
  plugin: MemoFlowSyncBridgePlugin;
  private pairCodeTicker: number | null = null;

  constructor(app: any, plugin: MemoFlowSyncBridgePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  private clearPairCodeTicker(): void {
    if (this.pairCodeTicker !== null) {
      window.clearInterval(this.pairCodeTicker);
      this.pairCodeTicker = null;
    }
  }

  hide(): void {
    this.clearPairCodeTicker();
  }

  display(): void {
    this.clearPairCodeTicker();
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("MemoFlow Sync Bridge / MemoFlow 同步桥")
      .setHeading();

    let pairCodeText: { setValue: (value: string) => unknown } | null = null;
    let pairCodeButton: { setButtonText: (value: string) => unknown } | null =
      null;
    const pairCodeSetting = new Setting(containerEl)
      .setName("当前配对码 / Current Pair Code")
      .addText((text) => {
        pairCodeText = text;
        text.inputEl.readOnly = true;
      })
      .addButton((button) => {
        pairCodeButton = button;
        button.setCta().onClick(async () => {
          const isAlive = this.plugin.isPairCodeAlive();
          if (!isAlive) {
            this.plugin.regeneratePairCode(true);
            await this.plugin.persistPluginData();
            renderPairCodeSetting();
            return;
          }

          const pairCode = this.plugin.getCurrentPairCode();
          if (!pairCode) {
            new Notice("当前无可用配对码 / No active pair code.");
            return;
          }

          try {
            await navigator.clipboard.writeText(pairCode);
            new Notice("配对码已复制 / Pair code copied.");
          } catch (_) {
            new Notice("复制失败，请手动复制 / Copy failed. Please copy manually.");
          }
        });
      });

    const renderPairCodeSetting = () => {
      const pairCode = this.plugin.getCurrentPairCode();
      const expiresInSec = Math.max(
        0,
        Math.ceil((this.plugin.getPairCodeExpiresAt() - Date.now()) / 1000),
      );
      const isAlive = expiresInSec > 0;
      const pairCodeStatus = isAlive
        ? `剩余 ${expiresInSec} 秒 / Expires in ${expiresInSec}s`
        : "已过期，请重置 / Expired, regenerate";
      pairCodeSetting.setDesc(
        `手机手动配对可直接输入此码。${pairCodeStatus} / Enter this code in mobile app manual pairing. ${pairCodeStatus}`,
      );
      pairCodeText?.setValue(pairCode);
      pairCodeButton?.setButtonText(
        isAlive ? "复制 / Copy" : "重置 / Regenerate",
      );
    };

    renderPairCodeSetting();
    this.pairCodeTicker = window.setInterval(() => {
      if (!containerEl.isConnected || containerEl.offsetParent === null) {
        this.clearPairCodeTicker();
        return;
      }
      renderPairCodeSetting();
    }, 1000);

    new Setting(containerEl)
      .setName("端口 / Port")
      .setDesc("本地 HTTP 服务端口 / Local HTTP service port")
      .addText((text) =>
        text
          .setPlaceholder("3000")
          .setValue(String(this.plugin.settings.port))
          .onChange(async (value) => {
            const next = this.plugin.parsePositiveInt(
              value,
              this.plugin.settings.port,
              1,
              65535,
            );
            if (next === this.plugin.settings.port) return;
            this.plugin.settings.port = next;
            await this.plugin.persistPluginData();
            await this.plugin.restartBridge();
          }),
      );

    new Setting(containerEl)
      .setName("笔记目录 / Inbox Folder")
      .setDesc("生成的 memo 文件写入目录 / Target folder for generated memo files")
      .addText((text) =>
        text
          .setPlaceholder("Inbox")
          .setValue(this.plugin.settings.inboxFolder)
          .onChange(async (value) => {
            this.plugin.settings.inboxFolder = value.trim() || "Inbox";
            await this.plugin.persistPluginData();
          }),
      );

    new Setting(containerEl)
      .setName("附件目录 / Attachments Folder")
      .setDesc("图片/视频/文件的写入目录 / Target folder for images/videos/files")
      .addText((text) =>
        text
          .setPlaceholder("attachments")
          .setValue(this.plugin.settings.attachmentsFolder)
          .onChange(async (value) => {
            this.plugin.settings.attachmentsFolder =
              value.trim() || "attachments";
            await this.plugin.persistPluginData();
          }),
      );

    new Setting(containerEl)
      .setName("广播名称 / Advertised Name")
      .setDesc("mDNS 自动发现显示的服务名 / Service name shown by mDNS discovery")
      .addText((text) =>
        text
          .setPlaceholder(`MemoFlow-${os.hostname()}`)
          .setValue(this.plugin.settings.advertisedName)
          .onChange(async (value) => {
            this.plugin.settings.advertisedName = value.trim();
            await this.plugin.persistPluginData();
            this.plugin.startMdns();
          }),
      );

    new Setting(containerEl)
      .setName("配对码有效期（秒） / Pair Code TTL (seconds)")
      .setDesc("配对码的有效时长 / How long a pair code stays valid")
      .addText((text) =>
        text
          .setPlaceholder("120")
          .setValue(String(this.plugin.settings.pairCodeTtlSeconds))
          .onChange(async (value) => {
            const next = this.plugin.parsePositiveInt(
              value,
              this.plugin.settings.pairCodeTtlSeconds,
              30,
              86400,
            );
            this.plugin.settings.pairCodeTtlSeconds = next;
            await this.plugin.persistPluginData();
          }),
      );

    new Setting(containerEl)
      .setName("单文件大小上限（MB） / Max File Size (MB)")
      .setDesc("单个附件允许的最大体积 / Single attachment max size")
      .addText((text) =>
        text
          .setPlaceholder("200")
          .setValue(String(this.plugin.settings.maxFileSizeMB))
          .onChange(async (value) => {
            const next = this.plugin.parsePositiveInt(
              value,
              this.plugin.settings.maxFileSizeMB,
              1,
              2048,
            );
            this.plugin.settings.maxFileSizeMB = next;
            await this.plugin.persistPluginData();
          }),
      );

    new Setting(containerEl)
      .setName("配对 / Pairing")
      .setDesc("重置配对码或展示二维码 / Regenerate pairing code or display a new QR")
      .addButton((button) =>
        button.setButtonText("重置 / Regenerate").onClick(async () => {
          this.plugin.regeneratePairCode(true);
          await this.plugin.persistPluginData();
          this.display();
        }),
      )
      .addButton((button) =>
        button.setButtonText("显示二维码 / Show QR").setCta().onClick(() => {
          new PairQrModal(this.app, this.plugin).open();
        }),
      );
  }
}

class PairQrModal extends Modal {
  private readonly plugin: MemoFlowSyncBridgePlugin;

  constructor(app: any, plugin: MemoFlowSyncBridgePlugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen(): Promise<void> {
    const { contentEl } = this;
    contentEl.empty();

    const pairUri = this.plugin.getPairUri();
    const pairCode = this.plugin.getCurrentPairCode();

    contentEl.createEl("h3", { text: "MemoFlow 配对二维码 / MemoFlow Pairing QR" });
    contentEl.createEl("p", {
      text: "请使用 MemoFlow 手机端扫描并完成配对 / Use MemoFlow mobile app to scan and complete pairing.",
    });

    try {
      const src = await QRCode.toDataURL(pairUri, {
        width: 280,
        margin: 1,
      });
      contentEl.createEl("img", {
        attr: {
          src,
          alt: "MemoFlow Pairing QR",
          style:
            "display:block;margin:12px auto;max-width:280px;width:100%;border-radius:8px;",
        },
      });
    } catch (error) {
      contentEl.createEl("p", {
        text: `二维码渲染失败 / QR render failed: ${String(error)}`,
      });
    }

    const box = contentEl.createEl("textarea", {
      text: pairCode,
    });
    box.rows = 1;
    box.readOnly = true;
    box.style.width = "100%";

    new Setting(contentEl)
      .setName("复制配对码 / Copy Pair Code")
      .addButton((button) =>
        button.setButtonText("复制 / Copy").setCta().onClick(async () => {
          try {
            await navigator.clipboard.writeText(pairCode);
            new Notice("配对码已复制 / Pair code copied.");
          } catch (_) {
            new Notice("复制失败，请手动复制 / Copy failed. Please copy manually.");
          }
        }),
      );

    contentEl.createEl("p", {
      text: "配对码有效期较短，过期请重置 / Pair code is short-lived. Regenerate if expired.",
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
