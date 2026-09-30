import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

export function useScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let prevX = window.innerWidth / 2
    let targetTime = 0
    let seeking = false

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value))

    const seekTo = (time: number) => {
      seeking = true
      video.currentTime = time
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!video.duration || Number.isNaN(video.duration)) return

      const currentX = event.clientX
      const delta = currentX - prevX
      prevX = currentX

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTime = clamp(video.currentTime + offset, 0, video.duration)

      if (!seeking) {
        seekTo(targetTime)
      }
    }

    const handleSeeked = () => {
      seeking = false
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        seekTo(targetTime)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    video.addEventListener('seeked', handleSeeked)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [])

  return videoRef
}
