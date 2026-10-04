import { useState } from 'react'
import { Chat } from './components/Chat'
import { ContactDialog } from './components/ContactDialog'
import { GlassControls, LiquidScene, type GlassMood } from './components/LiquidScene'
import { CONTACT, EDUCATION, EXPERIENCE, PUBLICATIONS } from './data/resume'

type Tab = 'experience' | 'education' | 'publications'
const tabs: Tab[] = ['experience', 'education', 'publications']

function App() {
  const [tab, setTab] = useState<Tab>('experience')
  const [mood, setMood] = useState<GlassMood>('pearl')
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [remix, setRemix] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  return <div className="liquid-world" data-mood={mood} data-motion={motion ? 'on' : 'off'} style={{ '--remix': `${remix * 47}deg` } as React.CSSProperties}>
    <LiquidScene motion={motion} />
    <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#">angela tao<span>✳</span></a><nav aria-label="Main navigation"><a href="#conversation">Meet my AI</a><a href="#background">My background</a><button type="button" className="contact-link" onClick={() => setContactOpen(true)}>Say hello</button></nav></header>
    <main id="main">
      <section className="hero" id="conversation" aria-labelledby="intro-title">
        <div className="intro">
          <div className="eyebrow intro-eyebrow"><span className="status-dot" /> HUMAN CURIOSITY. DIGITAL ATTITUDE.</div>
          <h1 id="intro-title">Hi, I’m Angela.<br />Let’s <em>make waves.</em></h1>
          <p className="intro-copy">I build AI products and explore how machines understand us. Now, a little piece of that curiosity lives here.</p>
          <p className="intro-detail">Meet my agent twin. A little sassy, always up for a conversation. Talk ideas, ask questions, or just say hi.</p>
          <div className="identity-tags"><span>AI product manager</span><span>ML researcher</span><span>A little sassy</span></div>
          <GlassControls mood={mood} onMoodChange={setMood} motion={motion} onMotionChange={() => setMotion(value => !value)} onStir={() => setRemix(value => value + 1)} />
          <a className="text-link" href="#background">Prefer to browse? Get to know me <span>↓</span></a>
          <div className="location"><span>◎</span> {CONTACT.location}<span className="location-line" /></div>
        </div>
        <div className="conversation-stage"><div className="floating-note" aria-hidden="true">100% artificial.<br /><em>Quite the personality.</em><span>↘</span></div><Chat /><div className="glass-caption"><span>✧</span> A LITTLE GLASS. A LOT OF CHARACTER.</div></div>
      </section>
      <div className="section-divider"><span>A LITTLE CONTEXT</span><span>THE HUMAN BEHIND THE AI ↓</span></div>
      <section className="background" id="background" aria-labelledby="background-title">
        <div className="background-heading"><div><p className="eyebrow">MY BACKGROUND</p><h2 id="background-title">Curiosity, put to work.</h2></div><p>From research questions to real-world products.<br />Here’s what I’ve been working on.</p></div>
        <div className="tabs" role="tablist" aria-label="Professional background" style={{ '--tab-index': tabs.indexOf(tab) } as React.CSSProperties}><span className="tab-indicator" aria-hidden="true" />{tabs.map((key, i) => <button key={key} id={`tab-${key}`} role="tab" aria-selected={tab === key} aria-controls={`panel-${key}`} tabIndex={tab === key ? 0 : -1} onClick={() => setTab(key)} onKeyDown={event => {
          if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
            event.preventDefault()
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (i + (event.key === 'ArrowRight' ? 1 : 2)) % 3
            setTab(tabs[next]); document.getElementById(`tab-${tabs[next]}`)?.focus()
          }
        }}>{key}<span>0{i + 1}</span></button>)}</div>
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="resume-panel">
          {tab === 'experience' && EXPERIENCE.map((entry, i) => <article className="resume-row" key={entry.org + entry.role}><div className="row-meta"><span className="row-number">0{i + 1}</span><p>{entry.period}</p></div><div className="row-title"><h3>{entry.org}</h3><p>{entry.role}</p></div><ul>{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></article>)}
          {tab === 'education' && EDUCATION.map((entry, i) => <article className="resume-row" key={entry.school}><div className="row-meta"><span className="row-number">0{i + 1}</span><p>{entry.period}</p></div><div className="row-title"><h3>{entry.school}</h3><p>{entry.degree}</p></div><ul>{entry.details.map(detail => <li key={detail}>{detail}</li>)}</ul></article>)}
          {tab === 'publications' && PUBLICATIONS.map((entry, i) => <article className="publication-row" key={entry.citation}><span className="row-number">0{i + 1}</span><p>{entry.citation}</p>{entry.link && <a href={entry.link} target="_blank" rel="noreferrer">{entry.linkLabel || 'Read paper'} ↗</a>}</article>)}
        </div>
      </section>
      <section className="contact-section"><p className="eyebrow">KEEP THE CONVERSATION GOING</p><h2>Let’s build something <em>meaningful.</em></h2><button type="button" onClick={() => setContactOpen(true)}>Say hello to the real me</button></section>
    </main>
    <footer><a className="wordmark" href="#">angela tao<span>✳</span></a><p>A human, and her AI counterpart.</p><div><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub ↗</a><button type="button" onClick={() => setContactOpen(true)}>Email</button></div></footer>
    <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  </div>
}

export default App
