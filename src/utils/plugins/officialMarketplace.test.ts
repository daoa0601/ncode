import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { getDeclaredMarketplaces } from './marketplaceManager.js'
import {
  isOfficialMarketplaceSupported,
  OFFICIAL_MARKETPLACE_NAME,
  OFFICIAL_MARKETPLACE_SOURCE,
} from './officialMarketplace.js'

describe('officialMarketplace', () => {
  const originalEnv = {
    USER_TYPE: process.env.USER_TYPE,
    NCODE_BUILD_MODE: process.env.NCODE_BUILD_MODE,
  }

  beforeEach(() => {
    delete process.env.USER_TYPE
    delete process.env.NCODE_BUILD_MODE
  })

  afterEach(() => {
    if (originalEnv.USER_TYPE !== undefined) {
      process.env.USER_TYPE = originalEnv.USER_TYPE
    } else {
      delete process.env.USER_TYPE
    }
    if (originalEnv.NCODE_BUILD_MODE !== undefined) {
      process.env.NCODE_BUILD_MODE = originalEnv.NCODE_BUILD_MODE
    } else {
      delete process.env.NCODE_BUILD_MODE
    }
  })

  test('OFFICIAL_MARKETPLACE_NAME is reserved name used in plugin IDs', () => {
    expect(OFFICIAL_MARKETPLACE_NAME).toBe('noumena-plugins-official')
  })

  test('OFFICIAL_MARKETPLACE_SOURCE uses legacy noumena/ncode repo', () => {
    // The source stays as the legacy internal repo. It should NOT point at the
    // public repository because the marketplace does not exist there either.
    expect(OFFICIAL_MARKETPLACE_SOURCE).toEqual({
      source: 'github',
      repo: 'noumena/ncode',
    })
  })

  test('isOfficialMarketplaceSupported is false for external/public builds', () => {
    process.env.USER_TYPE = 'external'
    expect(isOfficialMarketplaceSupported()).toBe(false)
  })

  test('isOfficialMarketplaceSupported is true for Noumena internal builds', () => {
    process.env.USER_TYPE = 'ant'
    expect(isOfficialMarketplaceSupported()).toBe(true)
  })

  test('getDeclaredMarketplaces does not include official marketplace on external builds', () => {
    process.env.USER_TYPE = 'external'
    const declared = getDeclaredMarketplaces()
    expect(declared[OFFICIAL_MARKETPLACE_NAME]).toBeUndefined()
  })
})
