import { createServer } from 'node:http'
import { buildPersonaInstructions } from './persona.mjs'

const port = Number(process.env.PORT || 3001)
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map(s => s.trim()))
const requests = new Map()
let dailyCount = 0
let day = new Date().toISOString().slice(0, 10)
const instructions = buildPersonaInstructions()

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
  res.end(JSON.stringify(body))
}

export const server = createServer(async (req, res) => {
  const origin = req.headers.origin
  if (origin && !allowedOrigins.has(origin)) return json(res, 403, { error: 'Origin not allowed.' })
  if (origin) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin') }
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600' }); return res.end()
  }
  if ((req.url === '/health' || req.url === '/ready') && req.method === 'GET') {
    const configured = Boolean(process.env.OPENAI_API_KEY?.trim() && process.env.OPENAI_MODEL?.trim())
    return json(res, req.url === '/ready' && !configured ? 503 : 200, { configured })
  }
  if (req.url !== '/api/chat') return json(res, 404, { error: 'Not found.' })
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Use POST.' }) }
  if (!req.headers['content-type']?.startsWith('application/json')) return json(res, 415, { error: 'Expected JSON.' })
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) return json(res, 503, { error: 'Agent is not configured.' })
  const now = Date.now()
  for (const [key, value] of requests) if (now - value.start >= 60000) requests.delete(key)
  // Only trust forwarding headers when your controlled reverse proxy overwrites them.
  const ip = process.env.TRUST_PROXY === 'true' ? String(req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim() : req.socket.remoteAddress
  const window = requests.get(ip) || { start: now, count: 0 }
  const today = new Date().toISOString().slice(0, 10)
  if (day !== today) { day = today; dailyCount = 0 }
  if (window.count >= 10 || dailyCount >= Number(process.env.DAILY_REQUEST_LIMIT || 200)) {
    res.setHeader('Retry-After', '60'); return json(res, 429, { error: 'Conversation limit reached.' })
  }
  window.count++; requests.set(ip, window)
  try {
    let body = ''
    for await (const chunk of req) {
      body += chunk.toString()
      if (Buffer.byteLength(body) > 30000) return json(res, 413, { error: 'Request too large.' })
    }
    let payload
    try { payload = JSON.parse(body) } catch { return json(res, 400, { error: 'Invalid JSON.' }) }
    const messages = payload?.messages
    if (!Array.isArray(messages) || !messages.length || messages.length > 12 || messages.some(m => !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || !m.content.trim() || m.content.length > 2000) || messages.at(-1).role !== 'user') return json(res, 400, { error: 'Invalid conversation.' })
    dailyCount++
    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL, instructions, input: messages.map(({ role, content }) => ({ role, content })), max_output_tokens: 700, store: false }),
      signal: AbortSignal.timeout(40000),
    })
    if (!upstream.ok) return json(res, upstream.status === 429 ? 429 : 502, { error: 'AI service unavailable.' })
    const result = await upstream.json()
    const reply = result.output?.filter(item => item.type === 'message').flatMap(item => item.content || []).filter(item => item.type === 'output_text').map(item => item.text).join('\n')
    if (!reply) return json(res, 502, { error: 'No reply received.' })
    return json(res, 200, { reply })
  } catch { return json(res, 502, { error: 'Unable to complete the conversation.' }) }
})

if (process.env.NODE_ENV !== 'test') server.listen(port, '0.0.0.0', () => console.log(`Angela's agent server listening on port ${port}`))
