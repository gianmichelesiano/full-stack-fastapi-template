import * as React from "react"
import { cn } from "../../utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  children: React.ReactElement
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup({ className, startElement, endElement, children, ...props }, ref) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string }>

    return (
      <div 
        className={cn("relative flex items-center", className)} 
        ref={ref} 
        {...props}
      >
        {startElement && (
          <div className="absolute left-3 flex h-full items-center pointer-events-none">
            {startElement}
          </div>
        )}
        {React.cloneElement(child, {
          className: cn(
            child.props.className,
            startElement && "pl-10",
            endElement && "pr-10"
          ),
        })}
        {endElement && (
          <div className="absolute right-3 flex h-full items-center pointer-events-none">
            {endElement}
          </div>
        )}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"
