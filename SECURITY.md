# Security Policy

## Supported Versions

Only the latest published release is considered supported for security fixes.

## Reporting a Vulnerability

Please do not open public GitHub issues for security vulnerabilities.

- Preferred: GitHub Security Advisory (private report)
- Fallback: open an issue requesting a private contact channel

When reporting, include:
- Reproduction steps
- Expected vs actual behavior
- Environment (OS, Obsidian version, plugin version)
- Any proof-of-concept request/response samples, if relevant

## Scope Notes

This plugin exposes a local LAN HTTP bridge and mDNS discovery endpoint.
Reports related to authentication bypass, unauthorized file writes, request parsing, and LAN exposure are in scope.
