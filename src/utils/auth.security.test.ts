import { describe, expect, it } from 'bun:test'

import { shouldBlockProjectOrLocalApiKeyHelperBeforeTrust } from './auth.js'

describe('apiKeyHelper workspace trust gating', () => {
  it('blocks project/local helpers until workspace trust has been accepted', () => {
    expect(shouldBlockProjectOrLocalApiKeyHelperBeforeTrust(false)).toBe(true)
    expect(shouldBlockProjectOrLocalApiKeyHelperBeforeTrust(true)).toBe(false)
  })
})
