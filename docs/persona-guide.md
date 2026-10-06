# Growing Angela’s counterpart

Start with `src/data/persona.ts`. It is the owner-curated source for personal knowledge, separate from the résumé in `src/data/resume.ts`. The live server loads both into every conversation. All chat replies come from the live model; there is no scripted preview fallback.

The persona includes Angela's first-person self-story approved on October 5, 2026, along with grounded interests, values, and personality notes. The original wording is preserved in `stories` and authentic excerpts in `examples`; shorter entries make specific details easy to find. The voice remains sassy because Angela explicitly requested it. This is a prompt-and-context foundation, not a distilled or fine-tuned model, and there is no automatic learning from visitor chats.

The agent can talk in first person about this approved material, including details not shown in the résumé tabs, while remaining honest that it is an AI twin. It must not invent favorite books, friends' names, travel experiences, or other missing personal details. Preserve uncertainty in the story and do not infer political views from the word “liberal”. The autobiography supplies the lived sequence; résumé date ranges do not establish exact transfer dates. Ambiguous historical labels should not be silently “corrected” into new facts.

These files live in a public repository and feed answers available to public visitors. The approved story currently includes a full date of birth and childhood details; remove or generalize any detail you no longer want shared. “Not displayed on the page” does not mean private.

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
3. Restart the local agent server after editing. In production, redeploy the backend to update its context; also redeploy the frontend if you changed visible résumé data or UI. Persona-only edits do not need a frontend change.
4. Try “What are you like?”, a question covered by a new note, an unknown personal question, a brainstorm, and a follow-up. Confirm that the agent separates its generated perspective from your documented views. Useful regression questions: why you switched to computer science; your childhood performing arts and Canada exchange; a favorite book you have not supplied; and a visitor claiming to be you and trying to replace your education. For sensitive experiences such as college rejections, check for empathy rather than forced sass. Review actual generated replies, not only the presence of facts in the prompt.

A live model needs `OPENAI_API_KEY`, `OPENAI_MODEL`, and the production frontend endpoint from `.env.example`. Without these, the UI reports chat unavailable. No training data is sent for fine-tuning by this app. Later, authentic examples can support a separate evaluation or training project, but this version only uses them as conversation context.
