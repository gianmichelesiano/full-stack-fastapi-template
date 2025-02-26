import * as React from "react"
import { cn } from "../../utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export interface SkeletonCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string | number
}

export const SkeletonCircle = React.forwardRef<
  HTMLDivElement,
  SkeletonCircleProps
>(function SkeletonCircle({ size = "2.5rem", className, ...props }, ref) {
  return (
    <div
      className={cn("animate-pulse rounded-full bg-muted", className)}
      style={{
        width: size,
        height: size,
      }}
      ref={ref}
      {...props}
    />
  )
})
SkeletonCircle.displayName = "SkeletonCircle"

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  noOfLines?: number
  gap?: string | number
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText({ noOfLines = 3, gap = "0.5rem", className, ...props }, ref) {
    return (
      <div
        className={cn("w-full", className)}
        style={{ gap }}
        ref={ref}
        {...props}
      >
        {Array.from({ length: noOfLines }).map((_, index) => (
          <Skeleton
            key={index}
            className={cn("h-4", {
              "max-w-[80%]": index === noOfLines - 1,
            })}
          />
        ))}
      </div>
    )
  }
)
SkeletonText.displayName = "SkeletonText"

export { Skeleton }
