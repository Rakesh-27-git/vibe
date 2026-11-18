# Vibe

**Build apps and websites by chatting with AI.** Describe what you want, and a team of AI agents writes the code, runs it in a sandbox, and gives you a live preview you can open and browse.

**Live demo:** https://vibe-phi-weld.vercel.app


## What it does

- **Chat-to-app generation.** Type a prompt ("Build a kanban board"). An agent network plans the work, writes files, runs commands and fixes its own errors.
- **Live sandbox preview.** The generated Next.js app runs in an isolated [E2B](https://e2b.dev) sandbox, so you see and click the real result, not a mockup.
- **Code view.** Browse the generated files in a file explorer with syntax highlighting.
- **Project history.** Every project keeps its messages and generated fragments, so you can come back and continue iterating.
- **Usage limits.** Credit-based rate limiting per user: a free tier and a higher pro tier, refreshed every 30 days.
- **Auth and plans.** Sign-in and plan checks with Clerk.

## How it works

```
Browser ── tRPC ──▶ Next.js server ── Inngest event ──▶ code-agent function
                                                          │
                              ┌───────────────────────────┤
                              ▼                           ▼
                  Agent network (agent-kit)        E2B sandbox
                  tools: terminal,                 runs the generated
                  createOrUpdateFiles, readFiles   Next.js app
                              │                           │
                              └──────▶ title + summary agents ──▶ Postgres (Prisma)
```

1. The user sends a prompt. A tRPC procedure checks and consumes a usage credit, saves the message and sends an `code-agent/run` event to **Inngest**.
2. An Inngest function creates an **E2B sandbox** and runs a coding agent (built with Inngest `agent-kit`) with three tools: `terminal`, `createOrUpdateFiles` and `readFiles`. The agent loops (capped at 15 iterations) until the task is done.
3. Two small agents then write a short title and a friendly summary for the result.
4. The sandbox URL and generated files are saved as a *Fragment* attached to the assistant message, and the UI shows the preview.

Running agents as durable background jobs (not inside a request handler) keeps long generations reliable and retryable.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| API | tRPC + TanStack Query, Zod validation |
| Database | PostgreSQL with Prisma (Projects, Messages, Fragments, Usage) |
| AI agents | Inngest agent-kit, OpenAI models |
| Code execution | E2B Code Interpreter sandbox |
| Auth and plans | Clerk |
| Rate limiting | rate-limiter-flexible (Prisma store) |
| UI | Tailwind CSS, Radix UI / shadcn-style components |

## Run it locally

```bash
git clone https://github.com/Rakesh-27-git/vibe.git
cd vibe
npm install
cp .env.example .env   # fill in the keys listed below
npx prisma migrate dev
npm run dev
```

In a second terminal, run the Inngest dev server so background jobs execute:

```bash
npx inngest-cli@latest dev
```

Environment variables: `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`, your Clerk keys, `OPENAI_API_KEY` and `E2B_API_KEY`.

## Things I'd improve next

- Streaming agent progress to the UI while it works.
- Tests around the usage tracker and the agent tools.
- A sandbox template with common dependencies pre-installed to cut generation time.

## Author

Built by [Rakesh Choudhary](https://github.com/Rakesh-27-git).
