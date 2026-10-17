# VR Dimensionality Framework (8Df) Codex Plugin

Version 2.4.1 packages the 8Df guided design workflow with a bundled local
stdio MCP server. After an explicitly approved DM-8 synthesis, the plugin
creates four local deliverables in the user's active workspace:

1. Word Specification (`.docx`)
2. Design Dossier (`.docx`)
3. Visual Layout Map (`.png`)
4. Comic Storyboard (`.png`)

Both PNG visuals are embedded in both Word documents and are also delivered as
separate files.

## Requirements

- Codex or another compatible Agent Plugins host with local stdio MCP support.
- Node.js 20 or later available as `node`.
- Permission to write to the selected local output directory.

## Installation

Use the versioned ZIP through a supported ZIP-based plugin importer, or place
the unpacked plugin in a Git-backed Codex marketplace. The archive root already
contains `plugin.json`, `mcp.json`, the skill, assets, and compiled MCP server.

This package uses a command-line MCP server. Public OpenAI directory submission
may require organizational allowlisting even when the package itself validates.

## Licensing

The original software implementation is licensed under Apache-2.0. The 8Df
framework content, knowledge base, framework data, name, and logo are expressly
excluded from that grant and remain protected. See:

- `LICENSE`
- `NOTICE`
- `CONTENT_LICENSE.md`
- `THIRD_PARTY_NOTICES.md`

The `license` value in `plugin.json` identifies the software implementation's
license; it does not override the protected-content exclusions.

## Support

- Website: https://vr-dimensionality-framework.tunedtide16.chatgpt.site
- Support: https://vr-dimensionality-framework.tunedtide16.chatgpt.site/support
- Email: eugenecc@gmail.com
