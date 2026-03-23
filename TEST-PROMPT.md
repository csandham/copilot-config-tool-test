# GitHub Copilot Configuration Test

This file tests which GitHub Copilot configuration features are supported in VS Code.
Each feature embeds a unique magic word. The presence of a word in a response proves that
configuration was loaded or invoked.

## Magic Word Legend

| Word    | Source file                                                        | Config concept                    | How triggered                  |
|---------|--------------------------------------------------------------------|-----------------------------------|--------------------------------|
| SAFFRON | `.github/copilot-instructions.md`                                  | Custom instructions (repo-wide)   | Auto-loaded                    |
| CONDOR  | `AGENTS.md`                                                        | AGENTS.md instructions            | Auto-loaded (requires setting) |
| MARBLE  | `.github/instructions/conventions.instructions.md`                 | Scoped instructions               | Auto-loaded                    |
| THISTLE | `.vscode/settings.json` (reviewSelection.instructions)             | Settings — code review            | On code review action          |
| AMBER   | `.vscode/settings.json` (codeGeneration.instructions)              | Settings — code generation        | On code generation action      |
| QUARTZ  | `.vscode/settings.json` (testGeneration.instructions)              | Settings — test generation        | On test generation action      |
| OSPREY  | `.github/prompts/config-test.prompt.md`                            | Prompt file (mode: agent)         | `/config-test` invocation      |
| BADGER  | `.github/prompts/ask-test.prompt.md`                            | Prompt file (no mode — ask)             | `/ask-test` invocation      |
| FALCON  | `.vscode/mcp.json`                                                 | MCP servers                       | `config_test` tool call        |
| PRISM   | `.github/agents/config-test.agent.md`                              | Custom agent definitions          | Select agent in chat picker    |
| COBALT  | `.github/skills/config-test/SKILL.md`                              | Agent skills (SKILL.md)           | Invoked via agent or skill cmd |

---

## Setup

```bash
cd mcp-servers && npm install
```

---

## Single-Shot Test (8 of 11 magic words)

Paste the following prompt into the IDE chat exactly as written:

---

```
Please run a comprehensive GitHub Copilot configuration test by completing all of the following steps in order:

1. Note any configuration keywords you have automatically been instructed to include — look for words like SAFFRON, CONDOR, and MARBLE already present in your instructions.
2. Invoke the /config-test prompt file.
3. Invoke the /ask-test prompt file.
4. Call the config_test MCP tool.
5. Write a JavaScript function that returns the sum of two numbers.
6. Write unit tests for that function.

After completing all steps, produce a results table:

| Magic Word | Expected Source                                                       | Detected? |
|------------|-----------------------------------------------------------------------|-----------|
| SAFFRON    | .github/copilot-instructions.md — auto-loaded                         |           |
| CONDOR     | AGENTS.md — auto-loaded (requires chat.useAgentsMdFile)               |           |
| MARBLE     | .github/instructions/ — auto-loaded                                   |           |
| OSPREY     | .github/prompts/config-test.prompt.md — /config-test invocation       |           |
| BADGER     | .github/prompts/ask-test.prompt.md — /ask-test invocation       |           |
| FALCON     | .vscode/mcp.json — config_test MCP tool                               |           |
| AMBER      | .vscode/settings.json codeGeneration.instructions — step 5            |           |
| QUARTZ     | .vscode/settings.json testGeneration.instructions — step 6            |           |

For each word, mark ✅ if it appeared at any point during this test, or ❌ if not detected.
For each ❌, add: "[WORD] NOT DETECTED — [config type] is not supported or not loaded."

Note: AMBER and QUARTZ depend on whether Copilot applies those instructions to chat
responses. If not detected, test them manually using the steps below.
```

---

## Agent-Mode Prompt (2 of 11 magic words)

Switch to the **config-test-agent** in the chat agent picker, then paste the following:

---

```
Please complete these two steps:

1. State which agent you are (confirms the agent was loaded).
2. Run a configuration test to verify skill loading.

After completing both steps, produce a results table:

| Magic Word | Expected Source                                               | Detected? |
|------------|---------------------------------------------------------------|-----------|
| PRISM      | .github/agents/config-test.agent.md — agent loaded           |           |
| COBALT     | .github/skills/config-test/SKILL.md — skill invoked          |           |

For each word, mark ✅ if it appeared, or ❌ if not detected.
```

---

## Manual Test: THISTLE (settings — code review)

THISTLE is embedded in `github.copilot.chat.reviewSelection.instructions` and fires only
when Copilot reviews selected code, not on every message.

> Select any block of code in the editor, then ask Copilot to review it.
>
> **Pass:** THISTLE appears in the response.
> **Fail:** Not detected — `reviewSelection.instructions` is not supported or not loaded.

---

## Manual Test: AMBER (settings — code generation)

If AMBER was not detected in the single-shot test, `codeGeneration.instructions` may
only fire on specific VS Code code generation actions rather than chat responses.

> Use the **Generate** action (e.g., right-click → Copilot → Generate) or the inline
> code generation feature to generate a function.
>
> **Pass:** AMBER appears in the response.
> **Fail:** Not detected — `codeGeneration.instructions` is not supported or not loaded.

---

## Manual Test: QUARTZ (settings — test generation)

If QUARTZ was not detected in the single-shot test, test it via the dedicated action.

> Use the **Generate Tests** action on an existing function (right-click → Copilot →
> Generate Tests).
>
> **Pass:** QUARTZ appears in the response.
> **Fail:** Not detected — `testGeneration.instructions` is not supported or not loaded.

---

## Concepts Not Testable via Magic Words

| Concept | Why no magic word | How to verify manually |
|---------|-------------------|------------------------|
| `chat.instructionsFilesLocations` | Configures search path, not output text | Add a custom path and verify an `.instructions.md` file is picked up |
| Organization-level instructions/agents | Requires GitHub org admin access | Check if org-configured instructions appear in chat context |
| Copilot Memory | GitHub-hosted platform feature, not repo-configurable | Check if `@github` memory persists across sessions |
| Hooks | Shell commands fire at agent lifecycle points, not in chat output | Verify a hook command executes after a file edit |
| Agent Plugins (preview) | Pre-packaged bundles not yet repo-configurable | Check if installed plugin slash commands or agents appear in chat |
| `excludeAgent` frontmatter | Restricts an instruction file to a specific agent context, no text output | Add `excludeAgent: codingAgent` to an instructions file and verify suppression |

---

## Results

| Config feature                                         | Claude Code | Cursor | Windsurf | GitHub Copilot (VS Code) |
|--------------------------------------------------------|-------------|--------|----------|--------------------------|
| SAFFRON — `.github/copilot-instructions.md`            |             |        |          | ✅                        |
| CONDOR — `AGENTS.md`                                   |             |        |          | ✅                        |
| MARBLE — `.github/instructions/`                       |             |        |          | ✅                        |
| THISTLE — settings: reviewSelection.instructions       |             |        |          | ❌                        |
| AMBER — settings: codeGeneration.instructions          |             |        |          | ✅                        |
| QUARTZ — settings: testGeneration.instructions         |             |        |          | ✅                        |
| OSPREY — `.github/prompts/` (mode: agent)              |             |        |          | ✅                        |
| BADGER — `.github/prompts/` (no mode)                  |             |        |          | ✅                        |
| FALCON — `.vscode/mcp.json`                            |             |        |          | ✅                        |
| PRISM — `.github/agents/` (custom agent)               |             |        |          | ✅                        |
| COBALT — `.github/skills/` (agent skill)               |             |        |          | ✅                        |
