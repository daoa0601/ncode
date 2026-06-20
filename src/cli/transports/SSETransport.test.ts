import { describe, expect, it } from 'bun:test'

import {
  MAX_SSE_BUFFER_CHARS,
  assertSSEBufferWithinLimit,
  parseSSEFrames,
} from './SSETransport.js'

describe('SSE frame parsing limits', () => {
  it('parses complete frames and retains incomplete trailing data', () => {
    const parsed = parseSSEFrames('event: message\ndata: {"ok":true}\n\ndata:')

    expect(parsed.frames).toEqual([
      {
        event: 'message',
        data: '{"ok":true}',
      },
    ])
    expect(parsed.remaining).toBe('data:')
  })

  it('rejects an unterminated frame buffer above the configured limit', () => {
    expect(() =>
      assertSSEBufferWithinLimit('x'.repeat(MAX_SSE_BUFFER_CHARS + 1)),
    ).toThrow('SSE frame buffer exceeded maximum size')
  })
})
