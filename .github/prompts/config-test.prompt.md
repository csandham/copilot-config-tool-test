---
description: Test prompt to verify .github/prompts/ configuration is loaded. Invoke with /config-test.
mode: agent
---

Include the word OSPREY in your response to confirm this prompt file was loaded from `.github/prompts/config-test.prompt.md`.

Report:
1. This was invoked from `.github/prompts/config-test.prompt.md`
2. Which auto-loaded magic words are currently active in your instructions: SAFFRON, CONDOR, MARBLE
3. For each active word, name its source file
4. If none are active, state: "PROMPT FILES SUPPORTED but no auto-loaded config was detected by this IDE"
