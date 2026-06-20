import { describe, expect, it, mock } from 'bun:test'

mock.module('./assets/audioCapture.js', () => ({
  getEmbeddedAudioCapturePath: () => null,
}))

const audio = await import('./audioCaptureNapi.js')

describe('audioCaptureNapi shim', () => {
  it('exports the API surface used by voice.ts', () => {
    expect(typeof audio.isNativeAudioAvailable).toBe('function')
    expect(typeof audio.startRecording).toBe('function')
    expect(typeof audio.stopRecording).toBe('function')
    expect(typeof audio.isRecording).toBe('function')
    expect(typeof audio.startPlayback).toBe('function')
    expect(typeof audio.writePlaybackData).toBe('function')
    expect(typeof audio.stopPlayback).toBe('function')
    expect(typeof audio.isPlaying).toBe('function')
    expect(typeof audio.microphoneAuthorizationStatus).toBe('function')
  })

  it('default export matches named exports', () => {
    expect(audio.default.isNativeAudioAvailable).toBe(audio.isNativeAudioAvailable)
    expect(audio.default.startRecording).toBe(audio.startRecording)
    expect(audio.default.stopRecording).toBe(audio.stopRecording)
    expect(audio.default.isRecording).toBe(audio.isRecording)
    expect(audio.default.startPlayback).toBe(audio.startPlayback)
    expect(audio.default.writePlaybackData).toBe(audio.writePlaybackData)
    expect(audio.default.stopPlayback).toBe(audio.stopPlayback)
    expect(audio.default.isPlaying).toBe(audio.isPlaying)
    expect(audio.default.microphoneAuthorizationStatus).toBe(
      audio.microphoneAuthorizationStatus,
    )
  })
})
