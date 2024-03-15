import { Button as NextUIButton } from "@nextui-org/react"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextUIButton
      startContent={icon}
      color={color}
      className={className}
      type={type}
      fullWidth={fullWidth}
      size="lg"
      variant="light"
    >
      {children}
    </NextUIButton>
  )
}
