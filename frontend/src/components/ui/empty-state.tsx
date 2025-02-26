"use client"

import * as React from "react"
import { cn } from "../../utils"

interface EmptyStateRootProps extends React.HTMLAttributes<HTMLDivElement> {}

const EmptyStateRoot = React.forwardRef<HTMLDivElement, EmptyStateRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    />
  )
)
EmptyStateRoot.displayName = "EmptyStateRoot"

interface EmptyStateContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const EmptyStateContent = React.forwardRef<HTMLDivElement, EmptyStateContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex max-w-[420px] flex-col items-center justify-center", className)}
      {...props}
    />
  )
)
EmptyStateContent.displayName = "EmptyStateContent"

interface EmptyStateIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const EmptyStateIndicator = React.forwardRef<HTMLDivElement, EmptyStateIndicatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-20 w-20 items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
)
EmptyStateIndicator.displayName = "EmptyStateIndicator"

interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const EmptyStateTitle = React.forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("mt-6 text-xl font-semibold", className)}
      {...props}
    />
  )
)
EmptyStateTitle.displayName = "EmptyStateTitle"

interface EmptyStateDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const EmptyStateDescription = React.forwardRef<HTMLParagraphElement, EmptyStateDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("mt-2 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
EmptyStateDescription.displayName = "EmptyStateDescription"

export const EmptyState = {
  Root: EmptyStateRoot,
  Content: EmptyStateContent,
  Indicator: EmptyStateIndicator,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
}
