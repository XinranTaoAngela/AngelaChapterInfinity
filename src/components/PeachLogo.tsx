interface PeachLogoProps {
  size?: number
  className?: string
  decorative?: boolean
}

export function PeachLogo({ size = 28, className, decorative = false }: PeachLogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}peach-at.svg`}
      width={size}
      height={size}
      className={className}
      alt={decorative ? '' : 'Angela Tao — peach AT logo'}
      aria-hidden={decorative || undefined}
      draggable={false}
    />
  )
}
