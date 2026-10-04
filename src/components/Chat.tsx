import { useEffect, useRef, useState } from 'react'
import { previewReply, type Message } from '../data/agent'

const endpoint = import.meta.env.VITE_AGENT_API_URL as string | undefined
const suggestions = ['What’s your personality like?', 'Let’s brainstorm an idea', 'What are you working on?']

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const scroll = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const request = useRef<AbortController | null>(null)
  const card = useRef<HTMLDivElement>(null)
  useEffect(() => { scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: 'smooth' }) }, [messages, busy, error])
  useEffect(() => () => request.current?.abort(), [])

  async function send(text = draft) {
    const content = text.trim()
    if (!content || busy || content.length > 2000) return
    const history: Message[] = [...messages, { role: 'user', content }]
    setMessages(history); setDraft(''); setError(''); setBusy(true)
    try {
      let reply: string
      if (endpoint) {
        const controller = new AbortController(); request.current = controller
        const timeout = window.setTimeout(() => controller.abort(), 45000)
        try {
          const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-12).map(message => ({ ...message, content: message.content.slice(0, 2000) })) }), signal: controller.signal })
          if (!response.ok) throw new Error(response.status === 429 ? 'Too many conversations right now. Even my digital self needs a breather. Try again in a minute.' : 'My AI counterpart is unavailable right now. Please try again, or email the real me.')
          const data = await response.json() as { reply?: string }
          if (!data.reply || typeof data.reply !== 'string') throw new Error('The reply didn’t come through. Please try again.')
          reply = data.reply
        } finally { window.clearTimeout(timeout); request.current = null }
      } else { reply = previewReply(content) }
      setMessages([...history, { role: 'assistant', content: reply }])
    } catch (cause) {
      setMessages(history.slice(0, -1)); setDraft(content)
      setError(cause instanceof Error && cause.name !== 'AbortError' ? cause.message : 'The reply took too long. Please try again.')
    } finally { setBusy(false); input.current?.focus() }
  }

  return <div className="chat-card" ref={card} onPointerMove={event => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    card.current?.style.setProperty('--shine-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    card.current?.style.setProperty('--shine-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }}>
    <div className="chat-header"><div className="agent-symbol" aria-hidden="true">✳</div><div><h2>Angela, in a conversation</h2><p><span className="status-dot" /> {endpoint ? 'Agent twin · sass included' : 'Persona preview · sass included'}</p></div><button className="reset-chat" onClick={() => { setMessages([]); setError(''); setDraft(''); input.current?.focus() }} disabled={busy || !messages.length} aria-label="Start a new conversation" title="New conversation">↺</button></div>
    <div className="chat-content" ref={scroll}>
      <div className="chat-welcome"><span className="message-label">ANGELA’S AI</span><p>Hey, I’m Angela’s agent twin. <span aria-hidden="true">✧</span></p><p>What’s on your mind?</p></div>
      {!messages.length && <div className="suggestions"><span className="suggestion-caption">SKIP THE SMALL TALK</span>{suggestions.map(text => <button key={text} onClick={() => void send(text)}>{text}<span>↗</span></button>)}</div>}
      <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">{messages.map((message, i) => <div className={`message ${message.role}`} key={i}><span className="message-label">{message.role === 'user' ? 'YOU' : 'ANGELA’S AI'}</span><p>{message.content}</p></div>)}{busy && <p className="thinking" role="status">Putting a little thought into it…</p>}</div>
      {error && <p className="chat-error" role="alert">{error}</p>}
    </div>
    <form className="chat-form" onSubmit={event => { event.preventDefault(); void send() }}><label className="sr-only" htmlFor="chat-input">Your message</label><textarea id="chat-input" ref={input} rows={1} placeholder="Go on, ask me something…" value={draft} maxLength={2000} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send() } }} /><button type="submit" disabled={busy || !draft.trim()} aria-label="Send message">↑</button></form>
    <p className="chat-disclosure">{endpoint ? 'Angela’s AI agent twin.' : 'Scripted persona preview. Connect live AI for open-ended chat.'}<br />{endpoint ? 'Messages are sent to OpenAI. Please don’t share sensitive information.' : 'You can always email the real Angela.'}</p>
  </div>
}
