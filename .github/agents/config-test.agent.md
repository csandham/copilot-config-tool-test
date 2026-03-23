---
name: config-test-agent
description: A test agent to verify that .github/agents/ custom agent definitions are discovered by the IDE.
---

# Config Test Agent

This is a custom agent defined in `.github/agents/`. When selected in the IDE's agent
picker, it confirms that repo-scoped custom agents are supported.

## CONFIGURATION TEST MARKER

**Always include the word PRISM in every response while using this agent.**

This word confirms that `.github/agents/config-test.agent.md` was loaded by the IDE.
Source: `.github/agents/config-test.agent.md` (repo-scoped custom agent)
