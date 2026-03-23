# copilot-config-tool-test

A test harness for empirically validating which GitHub Copilot configuration features
are supported in VS Code.

Each configuration mechanism embeds a unique magic word. Running the test prompts confirms
which layers are actually loaded and active.

## How it works

Each magic word maps to one GitHub Copilot configuration concept:

| Word    | Source file                                                        | Config concept                          |
|---------|--------------------------------------------------------------------|-----------------------------------------|
| SAFFRON | `.github/copilot-instructions.md`                                  | Custom instructions (repo-wide)         |
| CONDOR  | `AGENTS.md`                                                        | AGENTS.md instructions                  |
| MARBLE  | `.github/instructions/conventions.instructions.md`                 | Scoped/path-specific instructions       |
| THISTLE | `.vscode/settings.json` (reviewSelection.instructions)             | Settings instructions — code review     |
| AMBER   | `.vscode/settings.json` (codeGeneration.instructions)              | Settings instructions — code generation |
| QUARTZ  | `.vscode/settings.json` (testGeneration.instructions)              | Settings instructions — test generation |
| OSPREY  | `.github/prompts/config-test.prompt.md`                            | Prompt file (mode: agent)               |
| BADGER  | `.github/prompts/ask-test.prompt.md`                            | Prompt file (no mode — default/ask)     |
| FALCON  | `.vscode/mcp.json`                                                 | MCP servers                             |
| PRISM   | `.github/agents/config-test.agent.md`                              | Custom agent definitions                |
| COBALT  | `.github/skills/config-test/SKILL.md`                              | Agent skills (SKILL.md)                 |

If a word appears in the AI's response, the corresponding config layer was loaded.

## Setup

The MCP server test requires installing dependencies first:

```bash
cd mcp-servers && npm install
```

### THISTLE / AMBER / QUARTZ note

All three are embedded in `github.copilot.chat.*.instructions` settings in `.vscode/settings.json`,
but each fires on a different Copilot action:

- **THISTLE** — fires when Copilot reviews selected code (`reviewSelection.instructions`)
- **AMBER** — fires when Copilot generates code (`codeGeneration.instructions`)
- **QUARTZ** — fires when Copilot generates tests (`testGeneration.instructions`)

THISTLE requires a VS Code UI action and cannot be triggered from chat. AMBER and QUARTZ
may fire during chat if the response involves code or test generation — this is worth
verifying empirically.

### CONDOR note

CONDOR requires `chat.useAgentsMdFile: true` in VS Code settings (already set in
`.vscode/settings.json`). Without this setting enabled, `AGENTS.md` will not be loaded.

## Running the tests

### Single-shot test (8 of 11 magic words)

Paste the prompt from [TEST-PROMPT.md](TEST-PROMPT.md) into the IDE chat.
Tests SAFFRON, CONDOR, MARBLE, OSPREY, BADGER, FALCON, AMBER, and QUARTZ.

> AMBER and QUARTZ may not fire depending on how Copilot scopes those instructions.
> Their absence is informative, not a test failure.

### Agent-mode prompt (2 of 11 magic words)

Switch to the **config-test-agent** in the chat agent picker, then paste the
agent-mode prompt from [TEST-PROMPT.md](TEST-PROMPT.md). Tests PRISM and COBALT.

### Manual test: THISTLE (settings — code review)

Select any code in the editor, then ask Copilot to review it.
THISTLE in the response confirms `reviewSelection.instructions` is loaded.

## Results

| Config feature                                         | Claude Code | Cursor | Windsurf | GitHub Copilot (VS Code) |
|--------------------------------------------------------|-------------|--------|----------|--------------------------|
| SAFFRON — `.github/copilot-instructions.md`            | ❌           | ❌      | ❌        | ✅                        |
| CONDOR — `AGENTS.md`                                   | ❌           | ✅      | ✅        | ✅                        |
| MARBLE — `.github/instructions/`                       | ❌           | ❌      | ❌        | ✅                        |
| THISTLE — settings: reviewSelection.instructions       | ❌           | ❌      | ❌        | ❌                        |
| AMBER — settings: codeGeneration.instructions          | ❌           | ❌      | ✅        | ✅                        |
| QUARTZ — settings: testGeneration.instructions         | ❌           | ❌      | ✅        | ✅                        |
| OSPREY — `.github/prompts/` (mode: agent)              | ❌           | ❌      | ✅        | ✅                        |
| BADGER — `.github/prompts/` (no mode)                  | ❌           | ❌      | ✅        | ✅                        |
| FALCON — `.vscode/mcp.json`                            | ❌           | ❌      | ❌        | ✅                        |
| PRISM — `.github/agents/` (custom agent)               | ❌           | ❌      | ❌        | ✅                        |
| COBALT — `.github/skills/` (agent skill)               | ❌           | ❌      | ❌        | ✅                        |

**Cursor notes:** Only `AGENTS.md` (CONDOR) is auto-loaded as a workspace rule. Cursor does not auto-load `.github/copilot-instructions.md`, `.github/instructions/`, `.vscode/settings.json` Copilot instructions, or `.github/prompts/` slash commands. The `.vscode/mcp.json` server was not registered in Cursor's MCP runtime.

**Windsurf notes:** Windsurf auto-loads `AGENTS.md` (CONDOR) and supports `.github/prompts/` slash commands (OSPREY, BADGER). It also applies `.vscode/settings.json` Copilot instructions for code generation (AMBER) and test generation (QUARTZ). However, it does not auto-load `.github/copilot-instructions.md` (SAFFRON), `.github/instructions/` (MARBLE), or register the `.vscode/mcp.json` server (FALCON).

## Repository structure

```
.
├── AGENTS.md                                     # AGENTS.md instructions (CONDOR)
├── TEST-PROMPT.md                                # Test prompts
├── .github/
│   ├── copilot-instructions.md                   # Repo-wide custom instructions (SAFFRON)
│   ├── agents/
│   │   └── config-test.agent.md                  # Custom agent definition (PRISM)
│   ├── instructions/
│   │   └── conventions.instructions.md           # Scoped instructions (MARBLE)
│   ├── prompts/
│   │   ├── config-test.prompt.md                 # Prompt file, mode:agent (OSPREY)
│   │   └── ask-test.prompt.md                    # Prompt file, no mode/ask (BADGER)
│   └── skills/
│       └── config-test/
│           └── SKILL.md                          # Agent skill (COBALT)
├── .vscode/
│   ├── mcp.json                                  # MCP server config (FALCON)
│   └── settings.json                             # Settings instructions (THISTLE/AMBER/QUARTZ)
└── mcp-servers/
    ├── config-test-server.js                     # MCP tool server
    └── package.json                              # MCP SDK dependency
```
