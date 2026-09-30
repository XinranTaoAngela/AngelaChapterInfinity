import { useTypewriter } from '../hooks/useTypewriter'

const TYPEWRITER_TEXT = "Glad you're here — take a look at what I've been building lately."

export function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT)

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <div
          className="pointer-events-none mb-5 select-none text-[var(--ink)] sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            filter: 'blur(4px)',
          }}
        >
          Hey there, I'm Angela,
          <br />
          AI Product Manager &amp; Machine Learning Researcher
        </div>

        <p
          className="mb-5 text-[var(--ink)] sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span className="animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-[var(--ink)]" />
          )}
        </p>
      </div>
    </section>
  )
}
