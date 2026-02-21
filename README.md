# MemoFlow Sync Bridge (Obsidian Plugin)

This plugin exposes a local LAN bridge for MemoFlow mobile clients.

## Features
- Local HTTP bridge (`/bridge/v1/*`)
- mDNS broadcast (`_memoflow._tcp.local`)
- QR pairing for mobile clients
- Multipart memo + attachments ingestion

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## API
- `GET /bridge/v1/health`
- `POST /bridge/v1/pair/confirm`
- `POST /bridge/v1/memo/upload`

This plugin is desktop-only.