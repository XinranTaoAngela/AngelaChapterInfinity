import { useEyeTracking } from '../hooks/useEyeTracking'

export function CharacterBackground() {
  const { refs, offsets } = useEyeTracking(2)

  return (
    <div
      className="fixed inset-0 z-0 h-full w-full overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 70% 40%, #1a1a1a 0%, #000 70%)',
      }}
    >
      <svg
        viewBox="0 0 480 640"
        preserveAspectRatio="xMidYMid slice"
        className="absolute h-full"
        style={{ right: '6%', top: 0 }}
      >
        <path
          d="M240,55 C145,55 85,150 85,265 C85,345 105,425 78,525 C68,565 88,605 128,625 L352,625 C392,605 412,565 402,525 C375,425 395,345 395,265 C395,150 335,55 240,55 Z"
          fill="#0d0d0d"
        />

        <rect x="205" y="375" width="70" height="95" rx="20" fill="#f1d3b5" />

        <ellipse cx="240" cy="300" rx="98" ry="118" fill="#f6ddc2" />

        <path
          d="M240,180 C185,180 150,215 145,265 C170,240 205,228 240,228 C275,228 310,240 335,265 C330,215 295,180 240,180 Z"
          fill="#0d0d0d"
        />

        <path
          d="M132,255 C122,300 128,345 118,385"
          stroke="#0d0d0d"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M348,255 C358,300 352,345 362,385"
          stroke="#0d0d0d"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M188,258 Q200,248 214,256"
          stroke="#2a1c14"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M266,256 Q280,248 292,258"
          stroke="#2a1c14"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        <g>
          <ellipse cx="202" cy="288" rx="20" ry="13" fill="#fff" />
          <circle
            ref={(el) => {
              refs.current[0] = el
            }}
            cx={202 + offsets[0].x}
            cy={288 + offsets[0].y}
            r="7"
            fill="#241a12"
          />
        </g>
        <g>
          <ellipse cx="278" cy="288" rx="20" ry="13" fill="#fff" />
          <circle
            ref={(el) => {
              refs.current[1] = el
            }}
            cx={278 + offsets[1].x}
            cy={288 + offsets[1].y}
            r="7"
            fill="#241a12"
          />
        </g>

        <path
          d="M240,300 C236,320 234,332 240,338"
          stroke="#d9a877"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M215,352 Q240,368 265,352"
          stroke="#b5673f"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M110,460 L240,515 L370,460 L415,625 L65,625 Z"
          fill="#fbfbfb"
        />
        <path d="M240,515 L205,470 L240,455 L275,470 Z" fill="#e9e9e9" />
      </svg>
    </div>
  )
}
