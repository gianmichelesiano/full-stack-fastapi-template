import * as React from "react"
import { LuX } from "react-icons/lu"
import { Button, type ButtonProps } from "./button"
import { cn } from "../../utils"

export type CloseButtonProps = ButtonProps

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton({ className, children, ...props }, ref) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Close"
      ref={ref}
      className={cn("rounded-full", className)}
      {...props}
    >
      {children ?? <LuX className="h-4 w-4" />}
    </Button>
  )
})
CloseButton.displayName = "CloseButton"
