import { useEffect, useRef, useState } from 'react'

/**
 * Felt-doll avatar that looks at the cursor.
 *
 * The frames in /public/avatar are pre-rendered head poses (LivePortrait):
 *   COLS yaw steps   – col 0 looks toward screen-left, last col toward screen-right
 *   ROWS pitch steps – row 0 looks up, last row looks down
 * Head and eyes both turn in every frame; we pick the frame nearest to the pointer.
 */
const COLS = 7
const ROWS = 5
const CENTER_COL = (COLS - 1) / 2
const CENTER_ROW = (ROWS - 1) / 2

// where the eyes sit inside the frame (fractions of width / height)
const EYE_X = 0.5
const EYE_Y = 0.42

const frameSrc = (r: number, c: number) => `${import.meta.env.BASE_URL}avatar/r${r}_c${c}.webp`

export function CharacterBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState({ r: CENTER_ROW, c: CENTER_COL })
  const [ready, setReady] = useState(false)

  // preload every pose so swaps are instant
  useEffect(() => {
    let cancelled = false
    const loads: Promise<unknown>[] = []
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const img = new Image()
        img.src = frameSrc(r, c)
        loads.push(img.decode().catch(() => undefined))
      }
    Promise.all(loads).then(() => !cancelled && setReady(true))
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = { x: 0, y: 0 } // -1..1, where the pointer is relative to her eyes
    const cur = { x: 0, y: 0 }
    let lastMove = -Infinity

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      const ex = rect.left + rect.width * EYE_X
      const ey = rect.top + rect.height * EYE_Y
      const spanX = Math.max(window.innerWidth * 0.42, 280)
      const spanY = Math.max(window.innerHeight * 0.38, 220)
      target.x = Math.max(-1, Math.min(1, (e.clientX - ex) / spanX))
      target.y = Math.max(-1, Math.min(1, (e.clientY - ey) / spanY))
      lastMove = performance.now()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })

    let raf = 0
    let prev = performance.now()
    let shown = `${CENTER_ROW}_${CENTER_COL}`
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - prev) / 1000, 0.05)
      prev = now

      // no pointer for a while (or a phone): drift around gently
      if (now - lastMove > 4000 && !reduceMotion) {
        const t = now / 1000
        target.x = Math.sin(t * 0.5) * 0.55
        target.y = Math.sin(t * 0.83) * 0.3 - 0.1
      } else if (now - lastMove > 4000) {
        target.x = 0
        target.y = 0
      }

      const k = 1 - Math.exp(-dt * 7)
      cur.x += (target.x - cur.x) * k
      cur.y += (target.y - cur.y) * k

      const c = Math.round(CENTER_COL + cur.x * CENTER_COL)
      const r = Math.round(CENTER_ROW + cur.y * CENTER_ROW)
      const key = `${r}_${c}`
      if (key !== shown) {
        shown = key
        setFrame({ r, c })
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
    }
  }, [])

  const frames = []
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const active = r === frame.r && c === frame.c
      frames.push(
        <img
          key={`${r}_${c}`}
          src={frameSrc(r, c)}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
          style={{
            opacity: active ? 1 : 0,
            transition: active ? 'opacity 90ms linear' : 'opacity 160ms linear 60ms',
          }}
        />,
      )
    }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      style={{ background: 'radial-gradient(circle at 70% 40%, var(--cream) 0%, var(--cream-deep) 85%)' }}
    >
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="avatar-frame absolute"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 600ms ease' }}
      >
        {frames}
      </div>
    </div>
  )
}
