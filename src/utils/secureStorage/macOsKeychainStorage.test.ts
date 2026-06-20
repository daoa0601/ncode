import { describe, expect, it } from 'bun:test'

import {
  getMacOsKeychainDeleteArgs,
  getMacOsKeychainReadArgs,
} from './macOsKeychainStorage.js'

describe('macOS keychain command arguments', () => {
  it('passes username and service as argv entries', () => {
    expect(
      getMacOsKeychainReadArgs('user" && echo pwned', 'Noumena Code'),
    ).toEqual([
      'find-generic-password',
      '-a',
      'user" && echo pwned',
      '-w',
      '-s',
      'Noumena Code',
    ])
    expect(
      getMacOsKeychainDeleteArgs('user" && echo pwned', 'Noumena Code'),
    ).toEqual([
      'delete-generic-password',
      '-a',
      'user" && echo pwned',
      '-s',
      'Noumena Code',
    ])
  })
})
