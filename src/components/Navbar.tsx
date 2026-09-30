import { useState } from 'react'
import type { SectionKey } from './SectionOverlay'

const NAV_LINKS: { label: string; key: SectionKey }[] = [
  { label: 'Education', key: 'education' },
  { label: 'Experience', key: 'experience' },
  { label: 'Publications', key: 'publications' },
]

interface NavbarProps {
  onNavClick: (key: SectionKey) => void
}

export function Navbar({ onNavClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = (key: SectionKey) => {
    setMenuOpen(false)
    onNavClick(key)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex flex-row items-center gap-3">
          <span
            className="text-[21px] tracking-tight text-[var(--ink)] sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Angela Tao
          </span>
          <span
            className="select-none text-[25px] text-[var(--ink)] sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </div>

        <nav className="hidden flex-row text-[23px] text-[var(--ink)] md:flex">
          {NAV_LINKS.map((link, index) => (
            <span key={link.key}>
              <button type="button" onClick={() => handleClick(link.key)} className="transition-opacity hover:opacity-60">
                {link.label}
              </button>
              {index < NAV_LINKS.length - 1 && ', '}
            </span>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => handleClick('contact')}
          className="hidden text-[23px] text-[var(--ink)] underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </button>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-[var(--ink)] transition-transform duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-[var(--ink)] transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-[var(--ink)] transition-transform duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-[var(--cream)]/95 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.key}
            type="button"
            className="text-left text-[32px] font-medium text-[var(--ink)]"
            onClick={() => handleClick(link.key)}
          >
            {link.label}
          </button>
        ))}
        <button
          type="button"
          className="text-left text-[32px] font-medium text-[var(--ink)] underline underline-offset-2"
          onClick={() => handleClick('contact')}
        >
          Get in touch
        </button>
      </div>
    </>
  )
}
