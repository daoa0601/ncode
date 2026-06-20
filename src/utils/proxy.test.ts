import { afterEach, describe, expect, it } from 'bun:test'

import { getProxyFetchOptions } from './proxy.js'

const ORIGINAL_ENV = {
  HTTPS_PROXY: process.env.HTTPS_PROXY,
  https_proxy: process.env.https_proxy,
  NO_PROXY: process.env.NO_PROXY,
  no_proxy: process.env.no_proxy,
}

afterEach(() => {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
})

describe('Bun fetch proxy options', () => {
  it('honors NO_PROXY when the target URL is known', () => {
    process.env.HTTPS_PROXY = 'http://proxy.example.test:8080'
    delete process.env.https_proxy
    process.env.NO_PROXY = 'api.anthropic.com'
    delete process.env.no_proxy

    const options = getProxyFetchOptions({
      url: 'https://api.anthropic.com/v1/messages',
    })

    expect('proxy' in options).toBe(false)
  })
})
