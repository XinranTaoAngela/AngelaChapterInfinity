# Angela Tao

Personal website built with React, TypeScript, Vite, and Tailwind CSS. A liquid-glass layout features an evolving sassy AI counterpart, interactive color palettes, and accessible experience, education, and publication tabs.

## Development

```bash
npm ci
npm run dev
```

Use Node.js 22.18 or newer. Chat only uses generated replies from the live server. There is no scripted reply fallback. If its endpoint or credentials are missing, it reports that chat is unavailable.

## Live AI counterpart

Copy `.env.example` to `.env.local`. Set `OPENAI_API_KEY` and `OPENAI_MODEL` to a Responses API model available in your account. Never put an API key in a `VITE_` variable: those variables become public browser code.

Run `npm run agent` in one terminal and `npm run dev` in another. In development, Vite proxies `/api/chat` to port 3001, so `VITE_AGENT_API_URL` can be empty. Vite uses port 5173, matching the local allowed origin. Restart Vite after changing environment variables.

The server uses the [OpenAI Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses), sends the last 12 messages, limits output length, and sets `store: false`. This disables response application storage, not all provider retention. The UI discloses that messages go to OpenAI. The app itself does not persist conversations.

Edit `src/data/resume.ts` for professional background and `src/data/persona.ts` for your voice, facts, preferences, values, stories, opinions, and authentic writing examples. Follow [the persona guide](docs/persona-guide.md) to add information over time. `server/persona.mjs` combines both into the live agent instructions, following [OpenAI prompt guidance](https://developers.openai.com/api/docs/guides/prompt-engineering). The live agent can discuss everyday topics and brainstorm, while distinguishing generated perspectives from your documented views. This is a context-based foundation, not a distilled or fine-tuned model. Visitors cannot update your persona.

Publication titles and author order were checked against [arXiv](https://arxiv.org/abs/2412.15660) and the [ICASSP conference record](https://www.cmsworkshops.com/ICASSP2026/view_paper.php?PaperNum=14839). The RCAL button links to the conference details rather than claiming to provide full-text access.

“Say hello” and the footer Email button open a centered dialog with the address and a copy button. They do not navigate or launch an external email app.

## Build and verification

```bash
npm run build
npm run lint
npm run test:agent
```

## Deployment

### Agent backend on Render

`render.yaml` defines a single free Node web service, leaving the existing website on GitHub Pages. It requires `OPENAI_API_KEY` and sets `OPENAI_MODEL=gpt-4.1-mini` as server environment variables. API keys are supplied through Render's environment settings, not checked into Git. The runtime is pinned to Node 22.18 so the shared TypeScript persona and résumé can be loaded directly.

Deploy the Blueprint from this repository in your Render account. After adding the credentials and deploying, verify the actual generated reply:

```bash
npm run verify:agent -- https://YOUR-RENDER-SERVICE.onrender.com/api/chat
```

The verifier checks readiness, performs a real model request, and checks browser-origin access. Test requests consume API usage. `/health` is a process health check; `/ready` returns 503 if server credentials are missing. These checks do not replace a real provider request.

After successful verification, set the repository Actions variable `VITE_AGENT_API_URL` to the same `/api/chat` URL and run the frontend deployment workflow. Do not expose `OPENAI_API_KEY` as an Actions variable prefixed `VITE_` or include it in the browser bundle.

Render's [free services](https://render.com/docs/free) can sleep when idle, so the browser allows up to 90 seconds for the first reply. The model request itself has a 40-second timeout. A faster always-on hosting plan can be selected separately if desired. The free Blueprint does not make OpenAI API usage free.

### Frontend on GitHub Pages

Pushes to `main` trigger `.github/workflows/deploy.yml`, building the site and publishing `dist/` to `gh-pages`. In Settings → Pages, use the `gh-pages` branch. The site is configured for:

`https://xinrantaoangela.github.io/AngelaChapterInfinity/`

GitHub Pages only hosts the frontend. The Render Blueprint is the recommended backend route above. Other Node hosts can run `node server/index.mjs` with Node 22.18+, the same credentials, and `ALLOWED_ORIGINS=https://xinrantaoangela.github.io`. A public endpoint must use HTTPS.

The server includes 10 requests per minute per IP and a default 200-request daily cap, both held in memory. These reset on restart and apply per instance. For public production, enforce a durable global request/budget limit at your hosting gateway, plus a provider spending limit. Browser origin checks are not authentication. Keep `TRUST_PROXY=false` unless your own reverse proxy overwrites `X-Forwarded-For`; otherwise IP limits can be spoofed. Request bodies are bounded and keys and upstream errors are never returned to visitors.
