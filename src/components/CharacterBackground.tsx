import { useEyeTracking } from '../hooks/useEyeTracking'

export function CharacterBackground() {
  const { refs, offsets } = useEyeTracking(2)

  return (
    <div
      className="fixed inset-0 z-0 h-full w-full overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 70% 35%, var(--cream) 0%, var(--cream-deep) 75%)',
      }}
    >
      <svg
        viewBox="0 0 480 640"
        preserveAspectRatio="xMidYMid slice"
        className="absolute h-full"
        style={{ right: '6%', top: 0 }}
      >
        {/* hair back */}
        <path
          d="M240,58 C150,58 92,148 92,262 C92,330 108,400 96,478 C90,528 100,585 136,618 C132,560 140,510 132,462 C126,428 140,398 158,378 C150,340 150,300 168,260 C190,212 220,196 240,196 C260,196 290,212 312,260 C330,300 330,340 322,378 C340,398 354,428 348,462 C340,510 348,560 344,618 C380,585 390,528 384,478 C372,400 388,330 388,262 C388,148 330,58 240,58 Z"
          fill="#17110c"
        />

        {/* neck */}
        <rect x="206" y="372" width="68" height="98" rx="24" fill="#f7ddbd" />

        {/* face */}
        <ellipse cx="240" cy="298" rx="100" ry="116" fill="#fbe3c6" />

        {/* blush */}
        <ellipse cx="176" cy="322" rx="17" ry="11" fill="#f2a48f" opacity="0.5" />
        <ellipse cx="304" cy="322" rx="17" ry="11" fill="#f2a48f" opacity="0.5" />

        {/* bangs */}
        <path
          d="M240,178 C178,178 140,218 138,270 C165,242 202,226 240,226 C278,226 315,242 342,270 C340,218 302,178 240,178 Z"
          fill="#17110c"
        />
        <path d="M188,222 Q198,250 192,272" stroke="#2a2018" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M292,222 Q282,250 288,272" stroke="#2a2018" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />

        {/* eyebrows */}
        <path d="M186,254 Q200,242 218,251" stroke="#2f2318" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M262,251 Q280,242 294,254" stroke="#2f2318" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* eyes */}
        <g>
          <ellipse cx="200" cy="292" rx="24" ry="18" fill="#fff" />
          <circle
            ref={(el) => {
              refs.current[0] = el
            }}
            cx={200 + offsets[0].x}
            cy={292 + offsets[0].y}
            r="9.5"
            fill="#2b1d12"
          />
          <circle cx={198 + offsets[0].x} cy={288 + offsets[0].y} r="2.6" fill="#fff" />
          <path d="M180,280 Q200,268 222,280" stroke="#2f2318" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
        <g>
          <ellipse cx="280" cy="292" rx="24" ry="18" fill="#fff" />
          <circle
            ref={(el) => {
              refs.current[1] = el
            }}
            cx={280 + offsets[1].x}
            cy={292 + offsets[1].y}
            r="9.5"
            fill="#2b1d12"
          />
          <circle cx={278 + offsets[1].x} cy={288 + offsets[1].y} r="2.6" fill="#fff" />
          <path d="M258,280 Q280,268 300,280" stroke="#2f2318" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* nose */}
        <path
          d="M240,304 C237,320 235,330 240,335"
          stroke="#e0aa7f"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* mouth */}
        <path
          d="M214,352 Q240,370 266,352"
          stroke="#d97f6c"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* collar / shirt */}
        <path
          d="M112,458 L240,514 L368,458 L414,622 L66,622 Z"
          fill="#ffffff"
          stroke="#e3d9c4"
          strokeWidth="2"
        />
        <path d="M240,514 L204,468 L240,452 L276,468 Z" fill="#efe9da" />

        {/* hair bow */}
        <g transform="translate(322,158) rotate(18)">
          <path d="M0,0 L-26,-14 L-26,14 Z" fill="#f0a8c0" />
          <path d="M0,0 L26,-14 L26,14 Z" fill="#f0a8c0" />
          <circle cx="0" cy="0" r="7" fill="#e587a8" />
        </g>
      </svg>
    </div>
  )
}
