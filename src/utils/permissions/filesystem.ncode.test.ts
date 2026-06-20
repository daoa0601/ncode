import { describe, expect, test } from 'bun:test'
import { getOriginalCwd } from '../../bootstrap/state.js'
import { getPlanFilePath } from '../plans.js'
import {
  getNcodeSkillScope,
  isNcodeSettingsPath,
  isSessionPlanFile,
} from './filesystem.js'

describe('managed config canonical .ncode paths', () => {
  test('treats .ncode settings files as managed settings paths', () => {
    expect(isNcodeSettingsPath('/repo/.ncode/settings.json')).toBe(true)
    expect(isNcodeSettingsPath('/repo/.ncode/settings.local.json')).toBe(true)
  })

  test('creates narrowed skill scope suggestions for .ncode skills', () => {
    expect(
      getNcodeSkillScope(
        `${getOriginalCwd()}/.ncode/skills/verify/SKILL.md`,
      ),
    ).toEqual({
      skillName: 'verify',
      pattern: '/.ncode/skills/verify/**',
    })
  })

  test('matches only exact current-session plan filenames', () => {
    const planPath = getPlanFilePath()

    expect(isSessionPlanFile(planPath)).toBe(true)
    expect(isSessionPlanFile(planPath.replace(/\.md$/, '-suffix.md'))).toBe(
      false,
    )
  })
})
