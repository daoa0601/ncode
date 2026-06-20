import { describe, expect, it } from 'bun:test'

import {
  isNativeVersionPointer,
  normalizeNativeVersionPointer,
} from './download.js'

describe('native installer version pointers', () => {
  it('accepts shipped native binary version formats', () => {
    expect(normalizeNativeVersionPointer('v1.2.3')).toBe('1.2.3')
    expect(normalizeNativeVersionPointer('1.0.30-dev.shaf4937ce')).toBe(
      '1.0.30-dev.shaf4937ce',
    )
  })

  it('rejects path-like version pointers', () => {
    expect(isNativeVersionPointer('../1.2.3')).toBe(false)
    expect(isNativeVersionPointer('1.2.3/../../evil')).toBe(false)
    expect(() => normalizeNativeVersionPointer('1.2.3/evil')).toThrow(
      'Invalid native binary version',
    )
  })
})
