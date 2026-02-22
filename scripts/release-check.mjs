import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

const requiredFiles = [
  "manifest.json",
  "versions.json",
  "package.json",
  "README.md",
  "LICENSE",
  "main.js",
];

for (const file of requiredFiles) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) {
    errors.push(`Missing required file: ${file}`);
    continue;
  }
  const stat = fs.statSync(abs);
  if (!stat.isFile()) {
    errors.push(`Expected a file but found non-file path: ${file}`);
    continue;
  }
  if (stat.size === 0) {
    errors.push(`File is empty: ${file}`);
  }
}

const readJson = (file) => {
  const abs = path.join(root, file);
  try {
    return JSON.parse(fs.readFileSync(abs, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${String(error)}`);
    return null;
  }
};

const manifest = readJson("manifest.json");
const pkg = readJson("package.json");
const versions = readJson("versions.json");

if (manifest && pkg) {
  if (manifest.version !== pkg.version) {
    errors.push(
      `Version mismatch: manifest.json (${manifest.version}) != package.json (${pkg.version})`,
    );
  }
  if (manifest.id !== pkg.name) {
    warnings.push(
      `Name mismatch: manifest id (${manifest.id}) != package name (${pkg.name})`,
    );
  }
  if (!manifest.authorUrl || !String(manifest.authorUrl).trim()) {
    warnings.push("manifest.json: authorUrl is empty.");
  }
}

if (manifest && versions) {
  const mappedMinAppVersion = versions[manifest.version];
  if (!mappedMinAppVersion) {
    errors.push(
      `versions.json is missing an entry for plugin version ${manifest.version}.`,
    );
  } else if (mappedMinAppVersion !== manifest.minAppVersion) {
    errors.push(
      `versions.json maps ${manifest.version} to ${mappedMinAppVersion}, but manifest minAppVersion is ${manifest.minAppVersion}.`,
    );
  }
}

if (manifest && !/^\d+\.\d+\.\d+$/.test(String(manifest.version))) {
  warnings.push(
    `manifest.json version ${manifest.version} is not strict semver (x.y.z).`,
  );
}

if (manifest && String(manifest.version).startsWith("v")) {
  warnings.push(
    `manifest.json version ${manifest.version} starts with 'v'. Community plugin releases usually use plain semver like 0.1.0.`,
  );
}

const mainJsPath = path.join(root, "main.js");
if (fs.existsSync(mainJsPath)) {
  const size = fs.statSync(mainJsPath).size;
  if (size < 1024) {
    warnings.push(
      `main.js looks very small (${size} bytes). Confirm build output is correct.`,
    );
  }
}

if (warnings.length > 0) {
  console.warn("release-check warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("release-check errors:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("release-check passed.");
