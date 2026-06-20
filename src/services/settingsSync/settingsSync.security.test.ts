import { describe, expect, it } from 'bun:test'

import { containsSettingsSyncSecret } from './index.js'

describe('settings sync secret scanner', () => {
  it('detects high-confidence secrets before upload', () => {
    expect(
      containsSettingsSyncSecret(
        'token=ghp_1234567890abcdefghijklmnopqrstuvwxyz',
      ),
    ).toBe(true)
    expect(containsSettingsSyncSecret('theme=dark\nmodel=sonnet')).toBe(false)
  })
})
