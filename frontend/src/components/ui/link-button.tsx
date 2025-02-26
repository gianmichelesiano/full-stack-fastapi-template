"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button"
import { cn } from "../../utils"

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <a
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
LinkButton.displayName = "LinkButton"

export { LinkButton }
