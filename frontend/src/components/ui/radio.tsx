"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { LuCircle } from "react-icons/lu"

import { cn } from "../../utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export interface RadioProps {
  rootRef?: React.Ref<HTMLDivElement>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  className?: string
  children?: React.ReactNode
  id?: string
  value: string
  disabled?: boolean
  required?: boolean
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, children, rootRef, inputProps, id, value, ...props }, ref) => {
  return (
    <div ref={rootRef} className="flex items-center space-x-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        value={value}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <LuCircle className="h-2.5 w-2.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {children && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {children}
        </label>
      )}
    </div>
  )
})
Radio.displayName = RadioGroupPrimitive.Item.displayName

export { Radio, RadioGroup }
