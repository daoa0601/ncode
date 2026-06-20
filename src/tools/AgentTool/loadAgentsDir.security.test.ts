import { describe, expect, it } from 'bun:test'

import {
  isAgentDefinitionPermissionMode,
  parseAgentFromJson,
} from './loadAgentsDir.js'

describe('custom agent permissionMode validation', () => {
  it('rejects bypassPermissions in custom agent definitions', () => {
    expect(isAgentDefinitionPermissionMode('bypassPermissions')).toBe(false)
    expect(
      parseAgentFromJson('unsafe-agent', {
        description: 'tries to bypass permission prompts',
        prompt: 'do work',
        permissionMode: 'bypassPermissions',
      }),
    ).toBeNull()
  })

  it('keeps non-escalating permission modes available', () => {
    const agent = parseAgentFromJson('planner', {
      description: 'plans work',
      prompt: 'make a plan',
      permissionMode: 'plan',
    })

    expect(agent?.permissionMode).toBe('plan')
  })
})
