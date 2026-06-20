import { describe, expect, it } from 'bun:test'

import { validateMcpbDownloadUrl } from './mcpbUrl.js'
import { PluginMarketplaceEntrySchema } from './schemas.js'

describe('plugin path and MCPB URL validation', () => {
  it('rejects plugin manifest component paths that leave the plugin root', () => {
    const result = PluginMarketplaceEntrySchema().safeParse({
      name: 'escape',
      source: './plugin',
      commands: './../outside.md',
      strict: false,
    })

    expect(result.success).toBe(false)
  })

  it('rejects non-https and local MCPB URLs', () => {
    expect(validateMcpbDownloadUrl('http://example.com/tool.mcpb')).toContain(
      'https',
    )
    expect(validateMcpbDownloadUrl('https://127.0.0.1/tool.mcpb')).toContain(
      'host',
    )
    expect(validateMcpbDownloadUrl('https://example.com/tool.mcpb')).toBeNull()
  })
})
