import { useId } from 'react'

interface PeachLogoProps {
  size?: number
  className?: string
}

export function PeachLogo({ size = 28, className }: PeachLogoProps) {
  const id = useId()
  const fill = `${id}-f`
  const leaf = `${id}-l`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Peach logo"
    >
      <defs>
        <radialGradient id={fill} cx="0.36" cy="0.42" r="0.75">
          <stop offset="0" stopColor="#ffe0c2" />
          <stop offset="0.45" stopColor="#ffb08e" />
          <stop offset="1" stopColor="#f27a6b" />
        </radialGradient>
        <linearGradient id={leaf} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6aa35a" />
          <stop offset="1" stopColor="#9fcb7f" />
        </linearGradient>
      </defs>
      <path
        d="M32 59C15 56 5 45 6.5 31.5 8 20 17.5 13.5 26 15.5c2.6.6 4.6 2.2 6 4.2 1.4-2 3.4-3.6 6-4.2C46.5 13.5 56 20 57.5 31.5 59 45 49 56 32 59Z"
        fill={`url(#${fill})`}
      />
      <path d="M32 20c-4.5 9.5-5 25 0 39" stroke="#e46d62" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="18.5" cy="31" rx="4.2" ry="7" transform="rotate(-24 18.5 31)" fill="#fff" opacity="0.5" />
      <path d="M32 20c-.3-3.6-1.3-6.4-3-8.6" stroke="#7a5236" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M31.5 16.5C34 8.5 42 4 51 5.5 48.5 13.5 41 18.5 31.5 16.5Z" fill={`url(#${leaf})`} />
      <path
        d="M33.5 15.2C38.5 12 43.5 9.6 48 7.6"
        stroke="#4f8a43"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
