import { CONTACT, EDUCATION, EXPERIENCE, PUBLICATIONS } from './resume'

export interface Message { role: 'user' | 'assistant'; content: string }

// Limited local preview. A live model is only used when the endpoint is configured.
export function previewReply(question: string): string {
  const q = question.toLowerCase()
  if (/contact|email|connect|reach|hire/.test(q)) return `Ready for the human edition? Excellent taste. Reach Angela at ${CONTACT.email}, or find her on LinkedIn. She’s based in ${CONTACT.location}. “Say hello” opens her inbox.`
  if (/research|publication|paper|sentiment|rcal/.test(q)) return `Sentiment analysis, but make it multimodal. Angela researches how models combine signals to understand emotion, with PyTorch pipelines and robustness studies at Northeastern. Her listed publications:\n\n${PUBLICATIONS.map(p => p.citation).join('\n\n')}\n\nThe Publications tab has the details. Yes, there are receipts.`
  if (/education|study|studied|school|degree|university|into ai|background/.test(q)) return `The academic plot:\n\n${EDUCATION.map(e => `${e.degree} at ${e.school} (${e.period}).`).join('\n\n')}\n\nHer work spans ML research, LLM guardrails, and AI products. The personal origin story isn’t in my notes yet—and inventing lore would be a bold choice. Ask the real Angela for that one.`
  if (/work|experience|product|plaud|building|aperture|eval/.test(q)) return `AI that works is the goal. “It sounded confident” is not a quality metric.\n\nAngela is an ${EXPERIENCE[0].role} at ${EXPERIENCE[0].org}. ${EXPERIENCE[0].bullets[0]}. Her work includes persona agents, multi-step evaluations, and quality criteria for LLM-powered features.\n\nBefore that: enterprise LLM guardrails at Zscaler and agent evaluation at Digital China. The Experience tab has the full story.`
  if (/hello|^hi\b|hey/.test(q)) return 'Hey! You found the digital Angela. Good start. This résumé preview knows her experience, education, research, and contact details. What are we investigating?'
  return 'My preview-mode knowledge has boundaries. My attitude, apparently, does not. Try asking about Angela’s work, education, publications, or contact details. For that particular question, the real Angela is your best bet.'
}
