import { useState } from 'react'
import { CharacterBackground } from './components/CharacterBackground'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SectionOverlay, type SectionKey } from './components/SectionOverlay'

function App() {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null)

  return (
    <div className="relative min-h-screen bg-black">
      <CharacterBackground />
      <Navbar onNavClick={setActiveSection} />
      <Hero />
      <SectionOverlay section={activeSection} onClose={() => setActiveSection(null)} />
    </div>
  )
}

export default App
