# Growing Angela’s counterpart

Start with `src/data/persona.ts`. It is the owner-curated source for personal knowledge, separate from the résumé in `src/data/resume.ts`. The live server loads both into every conversation. All chat replies come from the live model; there is no scripted preview fallback.

The starter voice is sassy because Angela explicitly requested it. Other personal attributes are left blank. This is a prompt-and-context foundation, not a distilled or fine-tuned model, and there is no automatic learning from visitor chats.

## Add a little at a time

Add approved public entries to `facts`, `preferences`, `values`, `stories`, and `opinions`. Use real, owner-written information. Give each entry a specific topic so the live AI can interpret it with the surrounding context.

Copy this shape into the appropriate array and replace every placeholder:

```ts
{
  topic: 'a specific topic visitors might ask about',
  content: 'Your own first-person answer, with enough context to stand on its own.',
  source: 'Angela — personal note',
  updatedAt: 'YYYY-MM-DD',
},
```

Useful first additions: how you introduce yourself to a friend, what you enjoy outside work, an opinion you can explain in your own words, a story that shaped you, and what you sound like when disagreeing. A short authentic note is more valuable than an invented complete biography.

Add real writing or chat examples under `examples`:

```ts
{
  visitor: 'A question someone actually asked you',
  angela: 'The answer you actually wrote, or an answer you explicitly approve',
  source: 'Angela — approved writing example',
},
```

Examples guide rhythm, humor, vocabulary, and how you respond. Keep them representative: a normal conversation, an explanation, a disagreement, and an empathetic reply. Remove identifying information about other people. Everything in these files is public; do not add confidential journals, credentials, or private conversations.

## Review and publish

1. Add or revise a handful of entries. Replace outdated ones instead of accumulating contradictory facts.
2. Run `npm run build` and `npm run test:agent`.
3. Restart the local agent server after editing. In production, redeploy both server and frontend to update their context.
4. Try “What are you like?”, a question covered by a new note, an unknown personal question, a brainstorm, and a follow-up. Confirm that the agent separates its generated perspective from your documented views.

A live model needs `OPENAI_API_KEY`, `OPENAI_MODEL`, and the production frontend endpoint from `.env.example`. Without these, the UI reports chat unavailable. No training data is sent for fine-tuning by this app. Later, authentic examples can support a separate evaluation or training project, but this version only uses them as conversation context.
