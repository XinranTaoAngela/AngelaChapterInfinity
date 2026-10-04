import { CONTACT, EDUCATION, EXPERIENCE, PUBLICATIONS } from './resume'
import { PERSONA } from './persona'

export interface Message { role: 'user' | 'assistant'; content: string }

// Honest local persona preview. Open-ended generation requires the live endpoint.
export function previewReply(question: string): string {
  const q = question.toLowerCase()
  const personalNote = [...PERSONA.facts, ...PERSONA.preferences, ...PERSONA.values, ...PERSONA.stories, ...PERSONA.opinions].find(note => q.includes(note.topic.toLowerCase()))
  if (personalNote) return personalNote.content
  if (/personality|persona|what.*you.*like|replica|个性|性格|分身/.test(q)) return 'I’m Angela’s agent twin. Sassy, playful, and conversational—she chose the attitude herself. What would you like to talk about?'
  if (/favorite|hobb|belief|value|weekend|喜欢|爱好/.test(q)) return 'Angela hasn’t added that part of herself yet, so I won’t invent a favorite anything. The mysterious-person era is apparently still in progress. What’s yours?'
  if (/brainstorm|idea|creative|创意|想法/.test(q)) return 'Let’s start with the interesting bit: who is this for, and what should change for them? That’s a better starting point than “add AI and hope.” This offline preview can’t generate a full brainstorm yet, but the live counterpart can explore it with you.'
  if (/contact|email|connect|reach|hire/.test(q)) return `Ready for the human edition? Excellent taste. Reach Angela at ${CONTACT.email}, or find her on LinkedIn. She’s based in ${CONTACT.location}. “Say hello” opens her inbox.`
  if (/research|publication|paper|sentiment|rcal/.test(q)) return `Sentiment analysis, but make it multimodal. Angela researches how models combine signals to understand emotion, with PyTorch pipelines and robustness studies at Northeastern. Her listed publications:\n\n${PUBLICATIONS.map(p => p.citation).join('\n\n')}\n\nThe Publications tab has the details. Yes, there are receipts.`
  if (/education|study|studied|school|degree|university|into ai|background/.test(q)) return `The academic plot:\n\n${EDUCATION.map(e => `${e.degree} at ${e.school} (${e.period}).`).join('\n\n')}\n\nHer work spans ML research, LLM guardrails, and AI products. The personal origin story isn’t in my notes yet—and inventing lore would be a bold choice. Ask the real Angela for that one.`
  if (/work|experience|product|plaud|building|aperture|eval/.test(q)) return `AI that works is the goal. “It sounded confident” is not a quality metric.\n\nAngela is an ${EXPERIENCE[0].role} at ${EXPERIENCE[0].org}. ${EXPERIENCE[0].bullets[0]}. Her work includes persona agents, multi-step evaluations, and quality criteria for LLM-powered features.\n\nBefore that: enterprise LLM guardrails at Zscaler and agent evaluation at Digital China. The Experience tab has the full story.`
  if (/hello|^hi\b|hey|你好|嗨/.test(q)) return 'Hey! You found the digital Angela. Good start. We can skip the interview energy—what’s on your mind? I’m still a local persona preview until the live AI is connected.'
  return 'I’d happily get into that. Tiny plot twist: this local preview has scripted replies, so open-ended conversation needs the live AI connection. My persona is still growing as Angela adds her own stories and perspectives. Want to ask about my personality or her background in the meantime?'
}
