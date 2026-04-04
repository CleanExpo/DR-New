# Skill: opensrc — Dependency Source Intelligence

> Use this skill when you need to understand how a dependency works internally,
> debug unexpected behaviour, or build integrations that go beyond what types/docs expose.

## What is opensrc?

`opensrc` (by Vercel Labs) clones the source code of npm packages (and GitHub repos)
into `apps/web/opensrc/repos/` so AI agents can read implementation internals —
not just TypeScript types or README docs.

**Installed at**: `apps/web/opensrc/`
**Index**: `apps/web/opensrc/sources.json`
**CLI**: `npx opensrc <package>` (run from `apps/web/`)

---

## Pre-fetched Sources (DR-NRPG)

These are already available — read them directly:

| Package | Local Path | When to use |
|---------|-----------|-------------|
| `zod` | `opensrc/repos/github.com/colinhacks/zod` | Schema validation edge cases, `.refine()` internals, error map customisation |
| `stripe` | `opensrc/repos/github.com/stripe/stripe-node` | Webhook signature verification, idempotency keys, payment intent states |
| `next-auth` | `opensrc/repos/github.com/nextauthjs/next-auth` | Session callbacks, JWT encode/decode, Prisma adapter, middleware chain |
| `@langchain/anthropic` | `opensrc/repos/github.com/langchain-ai/langchainjs` | ChatAnthropic internals, streaming, tool binding, LangGraph state machines |
| `@anthropic-ai/sdk` | `opensrc/repos/github.com/anthropics/anthropic-sdk-typescript` | Raw API types, streaming events, tool use protocol, beta headers |
| `resend` | `opensrc/repos/github.com/resend/resend-node` | Email send/batch API, error types, rate limit handling |
| `xero-node` | `opensrc/repos/github.com/XeroAPI/xero-node` | OAuth2 flow, invoice/contact models, webhook events, refresh token logic |

---

## When to Fetch Additional Sources

Trigger `npx opensrc <package>` (from `apps/web/`) whenever you need to:

- Debug behaviour that contradicts the docs
- Understand exactly what a callback receives
- Find undocumented options or internal defaults
- Build a custom adapter or wrapper
- Audit security-sensitive internals (auth, crypto, signing)

### Common triggers in this codebase

```bash
# Investigating Prisma query internals or middleware
cd apps/web && npx opensrc @prisma/client --modify

# Understanding Next.js App Router RSC/SSR internals
cd apps/web && npx opensrc next --modify

# LangGraph agent state / checkpoint internals
cd apps/web && npx opensrc @langchain/langgraph --modify

# Redis / Bull queue internals
cd apps/web && npx opensrc ioredis --modify
cd apps/web && npx opensrc bull --modify

# Socket.io server internals
cd apps/web && npx opensrc socket.io --modify

# Supabase JS client internals
cd apps/web && npx opensrc @supabase/supabase-js --modify
```

---

## How to Use the Source After Fetching

1. **Find the file** — navigate the source tree in `opensrc/repos/<org>/<repo>/src/`
2. **Read key files** — use the Read tool on specific implementation files
3. **Search for internals** — use Grep within the opensrc path
4. **Do NOT modify** these files — they are reference-only, ignored by git and TypeScript

```bash
# Example: find how next-auth handles JWT refresh
Read: apps/web/opensrc/repos/github.com/nextauthjs/next-auth/packages/next-auth/src/jwt/index.ts

# Example: find how stripe verifies webhooks
Grep: "constructEvent" in apps/web/opensrc/repos/github.com/stripe/stripe-node/src/

# Example: find LangGraph state machine transitions
Grep: "StateGraph" in apps/web/opensrc/repos/github.com/langchain-ai/langchainjs/libs/langchain-langgraph/src/
```

---

## Generating a Source-Informed Implementation

When implementing against a complex dependency, follow this pattern:

1. **Check if source is available**: `cat apps/web/opensrc/sources.json`
2. **If not, fetch it**: `cd apps/web && npx opensrc <package> --modify`
3. **Read the relevant internals** before writing code
4. **Reference what you found** in your implementation comments if non-obvious

### Example: Building a custom LangChain tool

```typescript
// After reading opensrc/repos/github.com/langchain-ai/langchainjs/libs/langchain-core/src/tools/
// Confirmed: StructuredTool.call() wraps _call() with error handling + callbacks
// Using this pattern to ensure our tool integrates cleanly with the agent loop
```

---

## Fetching GitHub Repos Directly

You can also fetch any public GitHub repo (not just npm packages):

```bash
# Fetch Vercel AI SDK source
cd apps/web && npx opensrc vercel/ai --modify

# Fetch a specific branch
cd apps/web && npx opensrc owner/repo#main --modify

# Fetch opensrc itself (meta!)
cd apps/web && npx opensrc vercel-labs/opensrc --modify
```

---

## Managing Sources

```bash
# List all fetched sources
cd apps/web && npx opensrc list

# Remove a source to save disk space
cd apps/web && npx opensrc remove zod

# Update a source to latest installed version (re-run same command)
cd apps/web && npx opensrc zod --modify
```

---

## Project-Specific Notes

- `opensrc/` is in `.gitignore` — sources are never committed (too large)
- `opensrc/` is excluded from `tsconfig.json` — no type bleed-through
- Always run opensrc commands from `apps/web/` (where pnpm-lock.yaml lives)
- The `--modify` flag is pre-approved for this project — always use it
- `AGENTS.md` in `apps/web/` is auto-updated by opensrc and should not be manually edited in the opensrc section

---

## Quick Reference

```bash
# From apps/web/:
npx opensrc list                        # See what's already fetched
npx opensrc <package> --modify          # Fetch a new package
npx opensrc <owner>/<repo> --modify     # Fetch a GitHub repo
npx opensrc remove <package>            # Remove a source

# Read fetched source:
# apps/web/opensrc/repos/github.com/<org>/<repo>/src/
```
