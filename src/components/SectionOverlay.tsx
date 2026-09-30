import { CONTACT, EDUCATION, EXPERIENCE, PUBLICATIONS } from '../data/resume'

export type SectionKey = 'education' | 'experience' | 'publications' | 'contact'

interface SectionOverlayProps {
  section: SectionKey | null
  onClose: () => void
}

function EducationSection() {
  return (
    <div className="flex flex-col gap-8">
      {EDUCATION.map((entry) => (
        <div key={entry.school}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-[20px] text-[var(--ink)] sm:text-[24px]" style={{ fontFamily: 'var(--font-heading)' }}>
              {entry.school}
            </h3>
            <span className="text-[14px] text-[var(--ink)]/60 sm:text-[16px]">{entry.period}</span>
          </div>
          <p className="mt-1 text-[16px] text-[var(--ink)]/80 sm:text-[18px]">{entry.degree}</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {entry.details.map((detail) => (
              <li key={detail} className="text-[14px] leading-relaxed text-[var(--ink)]/60 sm:text-[16px]">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ExperienceSection() {
  return (
    <div className="flex flex-col gap-8">
      {EXPERIENCE.map((entry) => (
        <div key={`${entry.role}-${entry.org}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-[20px] text-[var(--ink)] sm:text-[24px]" style={{ fontFamily: 'var(--font-heading)' }}>
              {entry.role}
            </h3>
            <span className="text-[14px] text-[var(--ink)]/60 sm:text-[16px]">{entry.period}</span>
          </div>
          <p className="mt-1 text-[16px] text-[var(--ink)]/80 sm:text-[18px]">{entry.org}</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="text-[14px] leading-relaxed text-[var(--ink)]/60 sm:text-[16px]">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function PublicationsSection() {
  return (
    <div className="flex flex-col gap-6">
      {PUBLICATIONS.map((entry) => (
        <p key={entry.citation} className="text-[15px] leading-relaxed text-[var(--ink)]/80 sm:text-[17px]">
          {entry.link ? (
            <a href={entry.link} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:opacity-60">
              {entry.citation}
            </a>
          ) : (
            entry.citation
          )}
        </p>
      ))}
    </div>
  )
}

function ContactSection() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-[var(--ink)]/60 sm:text-[17px]">{CONTACT.location}</p>
      <a
        href={`mailto:${CONTACT.email}`}
        className="text-[18px] text-[var(--ink)] underline underline-offset-2 hover:opacity-60 sm:text-[22px]"
      >
        {CONTACT.email}
      </a>
      <a
        href={CONTACT.linkedin}
        target="_blank"
        rel="noreferrer"
        className="text-[18px] text-[var(--ink)] underline underline-offset-2 hover:opacity-60 sm:text-[22px]"
      >
        LinkedIn
      </a>
      <a
        href={CONTACT.github}
        target="_blank"
        rel="noreferrer"
        className="text-[18px] text-[var(--ink)] underline underline-offset-2 hover:opacity-60 sm:text-[22px]"
      >
        GitHub
      </a>
    </div>
  )
}

const SECTION_TITLES: Record<SectionKey, string> = {
  education: 'Education',
  experience: 'Experience',
  publications: 'Publications',
  contact: 'Contact',
}

export function SectionOverlay({ section, onClose }: SectionOverlayProps) {
  const isOpen = section !== null

  return (
    <div
      className={`fixed inset-0 z-20 flex justify-center overflow-y-auto bg-[var(--cream)]/95 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="w-full max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="fixed right-5 top-4 text-[28px] text-[var(--ink)] transition-opacity hover:opacity-60 sm:right-8 sm:top-5"
        >
          &times;
        </button>

        {section && (
          <>
            <h2
              className="mb-8 text-[32px] text-[var(--ink)] sm:mb-12 sm:text-[42px]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {SECTION_TITLES[section]}
            </h2>
            {section === 'education' && <EducationSection />}
            {section === 'experience' && <ExperienceSection />}
            {section === 'publications' && <PublicationsSection />}
            {section === 'contact' && <ContactSection />}
          </>
        )}
      </div>
    </div>
  )
}
