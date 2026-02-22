# MemoFlow Sync Bridge (Obsidian Plugin)

MemoFlow Sync Bridge is a desktop-only Obsidian plugin that exposes a local LAN bridge for MemoFlow mobile clients.

## Features
- Local HTTP bridge (`/bridge/v1/*`)
- mDNS broadcast (`_memoflow._tcp.local`)
- QR pairing with short-lived pair code
- Multipart memo and attachment ingestion into your vault

## Security and Privacy Disclosure
- The plugin starts a local HTTP server bound to `0.0.0.0` on a configurable port (default `3000`).
- The bridge is reachable by devices on the same LAN.
- The plugin publishes mDNS discovery records (`_memoflow._tcp.local`).
- The plugin does not send telemetry, analytics, or usage data.
- The plugin does not require cloud accounts, API keys, subscriptions, or ads.
- Notes and attachments are written only inside your vault paths configured in plugin settings.
- Plugin settings and authorized device tokens are stored in `.obsidian/plugins/memoflow-sync-bridge/data.json`.

## Recommended Safe Usage
- Use this plugin only on trusted private networks.
- Do not expose the bridge port to the public internet.
- Keep pair code TTL short and regenerate pair codes if they are leaked.
- Revoke previously paired devices by clearing plugin data when needed.

## API
- `GET /bridge/v1/health`
- `POST /bridge/v1/pair/confirm`
- `POST /bridge/v1/memo/upload`

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run check
npm run build
```

## Release Checklist (Maintainer)
1. Bump `version` in `manifest.json` and `package.json`.
2. Add or update `versions.json` with `"<plugin-version>": "<minAppVersion>"`.
3. Run:
```bash
npm run release:check
npm run build
```
4. Create a GitHub tag and release using the exact plugin version (example: `0.1.0`).
5. Upload release assets:
   - `manifest.json`
   - `main.js`
   - `styles.css` (only if your plugin uses one)
6. Submit or update your listing in `obsidianmd/obsidian-releases` by adding:
   - `https://github.com/hzc073/memoflow_obsidian_plugin`
   to `community-plugins.json`.

## Security Contact
Please report security issues using GitHub Security Advisories or follow `SECURITY.md`.