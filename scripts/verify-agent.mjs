// Checks a deployed backend, including a real model reply. Never prints secrets.
const target = process.argv[2]
if (!target) {
  console.error('Usage: npm run verify:agent -- https://YOUR-HOST/api/chat')
  process.exit(1)
}
const endpoint = new URL(target)
if (endpoint.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(endpoint.hostname)) {
  console.error('The public agent endpoint must use HTTPS.')
  process.exit(1)
}
const origin = process.env.AGENT_TEST_ORIGIN || 'https://xinrantaoangela.github.io'
try {
  const readiness = await fetch(new URL('/ready', endpoint), { headers: { Origin: origin }, signal: AbortSignal.timeout(90000) })
  if (!readiness.ok || !(await readiness.json()).configured) throw new Error('Backend is not configured with its API key and model.')
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello! Introduce yourself in one short sentence.' }] }),
    signal: AbortSignal.timeout(90000),
  })
  if (!response.ok) throw new Error(`Live chat returned HTTP ${response.status}. Check backend credentials, model access, and quota.`)
  if (response.headers.get('access-control-allow-origin') !== origin) throw new Error('Browser origin is not allowed by the backend.')
  const { reply } = await response.json()
  if (typeof reply !== 'string' || !reply.trim()) throw new Error('No generated reply received.')
  console.log('Live model connection and browser-origin check passed.')
  console.log(`Agent reply: ${reply}`)
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Verification failed.')
  process.exitCode = 1
}
