# Angela Tao

Personal website built with React, TypeScript, Vite, and Tailwind CSS. An avatar-free editorial layout features a sassy AI counterpart and accessible experience, education, and publication tabs.

## Development

```bash
npm ci
npm run dev
```

Use Node.js 22.18 or newer. Without `VITE_AGENT_API_URL`, chat runs a clearly labeled local résumé preview. These are predefined answers, not generated AI replies.

## Live AI counterpart

Copy `.env.example` to `.env.local`. Set `OPENAI_API_KEY` and `OPENAI_MODEL` to a Responses API model available in your account. Never put an API key in a `VITE_` variable: those variables become public browser code.

Run `npm run agent` in one terminal and `npm run dev` in another. With `VITE_AGENT_API_URL=http://localhost:3001/api/chat`, the frontend calls your private-key server. Restart Vite after changing environment variables.

The server uses the [OpenAI Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses), sends the last 12 messages, limits output length, and sets `store: false`. This disables response application storage, not all provider retention. The UI discloses that messages go to OpenAI. The app itself does not persist conversations.

Edit `src/data/resume.ts` to maintain the shared public résumé and agent knowledge. Edit the server instructions in `server/index.mjs` to tune sass and add approved personal stories or writing examples. The tone is a starting persona; an accurate personal replica needs your own examples and facts. Unknown personal answers stay unknown. Publication citations are preserved as supplied and have not been independently verified.

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
