import { IconSvgProps } from "@/types/icon-svg-props"

export const DotsThreeVerticalIcon = ({
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
    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path>
  </svg>
)
