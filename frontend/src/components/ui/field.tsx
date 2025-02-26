import * as React from "react"
import { cn } from "../../utils"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
  invalid?: boolean
  required?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field({ 
    className, 
    label, 
    children, 
    helperText, 
    errorText, 
    optionalText, 
    invalid, 
    required, 
    ...props 
  }, ref) {
    return (
      <div 
        ref={ref} 
        className={cn("space-y-2", className)} 
        {...props}
      >
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
              {!required && optionalText && (
                <span className="text-muted-foreground ml-1 text-xs">
                  {optionalText}
                </span>
              )}
            </label>
          </div>
        )}
        {children}
        {helperText && !invalid && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {errorText && invalid && (
          <p className="text-sm text-destructive">{errorText}</p>
        )}
      </div>
    )
  }
)
Field.displayName = "Field"
