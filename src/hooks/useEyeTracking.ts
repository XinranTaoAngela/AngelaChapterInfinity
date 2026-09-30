import { useEffect, useRef, useState } from 'react'

interface Offset {
  x: number
  y: number
}

const MAX_RADIUS = 4.5
const DISTANCE_SCALE = 0.05

export function useEyeTracking(eyeCount: number) {
  const refs = useRef<Array<SVGCircleElement | null>>(Array(eyeCount).fill(null))
  const [offsets, setOffsets] = useState<Offset[]>(
    Array.from({ length: eyeCount }, () => ({ x: 0, y: 0 })),
  )

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const next = refs.current.map((el): Offset => {
        if (!el) return { x: 0, y: 0 }
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = event.clientX - centerX
        const dy = event.clientY - centerY
        const angle = Math.atan2(dy, dx)
        const distance = Math.min(MAX_RADIUS, Math.hypot(dx, dy) * DISTANCE_SCALE)
        return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance }
      })
      setOffsets(next)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { refs, offsets }
}
