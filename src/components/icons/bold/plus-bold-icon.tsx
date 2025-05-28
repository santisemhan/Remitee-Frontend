import { IconSvgProps } from "@/types/icon-svg-props"

export const PlusBoldIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    width={size || width}
    fill="currentColor"
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
  </svg>
)
