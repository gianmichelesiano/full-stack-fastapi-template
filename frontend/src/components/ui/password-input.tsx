"use client"

import * as React from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { Field } from "./field"
import { InputGroup } from "./input-group"
import { Input, type InputProps } from "./input"
import { Button } from "./button"
import { cn } from "../../utils"

export interface PasswordVisibilityProps {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode }
}

export interface PasswordInputProps
  extends Omit<InputProps, "type">,
    PasswordVisibilityProps {
  startElement?: React.ReactNode
  type: string
  errors: any
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      className,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <FiEye className="h-4 w-4" />, off: <FiEyeOff className="h-4 w-4" /> },
      startElement,
      type,
      errors,
      ...rest
    } = props

    const [visible, setVisible] = React.useState(defaultVisible || false)
    
    React.useEffect(() => {
      if (visibleProp !== undefined) {
        setVisible(visibleProp)
      }
    }, [visibleProp])

    React.useEffect(() => {
      if (onVisibleChange) {
        onVisibleChange(visible)
      }
    }, [visible, onVisibleChange])

    const inputRef = React.useRef<HTMLInputElement>(null)
    const combinedRef = useCombinedRefs(ref, inputRef)

    return (
      <Field
        invalid={!!errors[type]}
        errorText={errors[type]?.message}
        className="w-full"
      >
        <InputGroup
          className="w-full"
          startElement={startElement}
          endElement={
            <VisibilityTrigger
              disabled={rest.disabled}
              onPointerDown={(e) => {
                if (rest.disabled) return
                if (e.button !== 0) return
                e.preventDefault()
                setVisible(!visible)
              }}
            >
              {visible ? visibilityIcon.off : visibilityIcon.on}
            </VisibilityTrigger>
          }
        >
          <Input
            className={className}
            {...rest}
            ref={combinedRef}
            type={visible ? "text" : "password"}
          />
        </InputGroup>
      </Field>
    )
  },
)
PasswordInput.displayName = "PasswordInput"

interface VisibilityTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, VisibilityTriggerProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <Button
        type="button"
        tabIndex={-1}
        ref={ref}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        aria-label="Toggle password visibility"
        {...props}
      />
    )
  }
)
VisibilityTrigger.displayName = "VisibilityTrigger"

interface PasswordStrengthMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  value: number
}

export const PasswordStrengthMeter = React.forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(function PasswordStrengthMeter({ className, max = 4, value, ...props }, ref) {
  const percent = (value / max) * 100
  const { label, color } = getColorInfo(percent)

  return (
    <div 
      className={cn("flex flex-col gap-1 items-end", className)} 
      ref={ref} 
      {...props}
    >
      <div className="flex w-full gap-1">
        {Array.from({ length: max }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 flex-1 rounded-sm bg-muted",
              index < value && `bg-${color}`
            )}
          />
        ))}
      </div>
      {label && <div className="text-xs">{label}</div>}
    </div>
  )
})
PasswordStrengthMeter.displayName = "PasswordStrengthMeter"

function getColorInfo(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: "Low", color: "destructive" }
    case percent < 66:
      return { label: "Medium", color: "orange-500" }
    default:
      return { label: "High", color: "green-500" }
  }
}

// Helper function to combine refs
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = React.useRef<T>(null)

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}
