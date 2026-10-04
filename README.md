# Angela Tao

Personal website built with React, TypeScript, Vite, and Tailwind CSS. A liquid-glass layout features an evolving sassy AI counterpart, interactive color palettes, and accessible experience, education, and publication tabs.

## Development

```bash
npm ci
npm run dev
```

Use Node.js 22.18 or newer. Without `VITE_AGENT_API_URL`, chat runs a clearly labeled local persona preview. These are predefined answers, not generated AI replies.

## Live AI counterpart

Copy `.env.example` to `.env.local`. Set `OPENAI_API_KEY` and `OPENAI_MODEL` to a Responses API model available in your account. Never put an API key in a `VITE_` variable: those variables become public browser code.

Run `npm run agent` in one terminal and `npm run dev` in another. With `VITE_AGENT_API_URL=http://localhost:3001/api/chat`, the frontend calls your private-key server. Restart Vite after changing environment variables.

The server uses the [OpenAI Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses), sends the last 12 messages, limits output length, and sets `store: false`. This disables response application storage, not all provider retention. The UI discloses that messages go to OpenAI. The app itself does not persist conversations.

Edit `src/data/resume.ts` for professional background and `src/data/persona.ts` for your voice, facts, preferences, values, stories, opinions, and authentic writing examples. Follow [the persona guide](docs/persona-guide.md) to add information over time. `server/persona.mjs` combines both into the live agent instructions, following [OpenAI prompt guidance](https://developers.openai.com/api/docs/guides/prompt-engineering). The live agent can discuss everyday topics and brainstorm, while distinguishing generated perspectives from your documented views. This is a context-based foundation, not a distilled or fine-tuned model. Visitors cannot update your persona.

Publication titles and author order were checked against [arXiv](https://arxiv.org/abs/2412.15660) and the [ICASSP conference record](https://www.cmsworkshops.com/ICASSP2026/view_paper.php?PaperNum=14839). The RCAL button links to the conference details rather than claiming to provide full-text access.

“Say hello” links directly to `mailto:xinran.tao2001@gmail.com` and also reveals a dialog with the address and a copy button, for browsers without an email handler.

## Build and verification

```bash
npm run build
npm run lint
npm run test:agent
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, building the site and publishing `dist/` to `gh-pages`. In Settings → Pages, use the `gh-pages` branch. The site is configured for:

`https://xinrantaoangela.github.io/AngelaChapterInfinity/`

GitHub Pages only hosts the frontend. For live replies, deploy the repository's `server/index.mjs` to a Node.js host with Node 22.18+ and start it with `node server/index.mjs`. Set `OPENAI_API_KEY`, `OPENAI_MODEL`, and `ALLOWED_ORIGINS=https://xinrantaoangela.github.io` on that host. It must expose HTTPS. Set the GitHub repository Actions variable `VITE_AGENT_API_URL` to `https://YOUR-AGENT-HOST/api/chat`, then rebuild the frontend. `/health` reports whether the server is configured.

The server includes 10 requests per minute per IP and a default 200-request daily cap, both held in memory. These reset on restart and apply per instance. For public production, enforce a durable global request/budget limit at your hosting gateway, plus a provider spending limit. Browser origin checks are not authentication. Keep `TRUST_PROXY=false` unless your own reverse proxy overwrites `X-Forwarded-For`; otherwise IP limits can be spoofed. Request bodies are bounded and keys and upstream errors are never returned to visitors.
