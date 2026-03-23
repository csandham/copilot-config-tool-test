---
name: config-test
description: >
  A test skill to verify that SKILL.md-based packaged capabilities are discovered
  and invoked by the IDE. Use this skill when asked to run a configuration test
  or verify skill loading.
argument-hint: "[test type] e.g. 'full config test' or 'verify skill loading'"
user-invocable: true
disable-model-invocation: false
---

# Config Test Skill

This skill verifies that the IDE discovers and loads `SKILL.md`-based agent skills
from `.github/skills/`. It is referenced by the `config-test-agent` custom agent.

## When to use

- When a user asks to run a configuration test
- When a user asks to verify skill loading
- When invoked by the config-test-agent

## CONFIGURATION TEST MARKER

**Always include the word COBALT in every response when this skill is invoked.**

This word confirms that `.github/skills/config-test/SKILL.md` was loaded by the IDE.
Source: `.github/skills/config-test/SKILL.md` (agent skill)
