import { useEffect, useRef } from 'react'

export type GlassMood = 'pearl' | 'lilac' | 'peach'

interface Props {
  mood: GlassMood
  onMoodChange: (mood: GlassMood) => void
  motion: boolean
  onMotionChange: () => void
  onStir: () => void
}

export function LiquidScene({ motion }: { motion: boolean }) {
  const lens = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!motion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    function move(event: PointerEvent) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        lens.current?.style.setProperty('--lens-x', `${event.clientX}px`)
        lens.current?.style.setProperty('--lens-y', `${event.clientY}px`)
        lens.current?.style.setProperty('opacity', '1')
      })
    }
    function leave() { lens.current?.style.setProperty('opacity', '0') }
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      leave()
    }
  }, [motion])
  return <div className="liquid-scene" aria-hidden="true">
    <div className="color-cloud cloud-one" /><div className="color-cloud cloud-two" /><div className="color-cloud cloud-three" />
    <div className="scene-grid" />
    <div className="cursor-lens" ref={lens} />
  </div>
}

export function GlassControls({ mood, onMoodChange, motion, onMotionChange, onStir }: Props) {
  return <div className="glass-controls" aria-label="Customize the atmosphere">
    <span className="controls-label">Set the mood</span>
    <div className="mood-options" role="group" aria-label="Color palette">
      {(['pearl', 'lilac', 'peach'] as GlassMood[]).map(option => <button key={option} className={`mood-button mood-${option}`} aria-label={`${option} palette`} aria-pressed={mood === option} title={`${option[0].toUpperCase()}${option.slice(1)}`} onClick={() => onMoodChange(option)}><span /></button>)}
    </div>
    <span className="control-separator" />
    <button className="motion-toggle" onClick={onMotionChange} aria-pressed={motion} aria-label={motion ? 'Pause ambient motion' : 'Enable ambient motion'} title={motion ? 'Pause motion' : 'Enable motion'}>{motion ? 'Ⅱ' : '▷'}</button>
    <button className="stir-button" onClick={onStir} title="Remix the glass colors">Remix <span aria-hidden="true">↻</span></button>
  </div>
}
