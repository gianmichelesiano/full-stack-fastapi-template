"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { LuCheck, LuChevronRight, LuCircle } from "react-icons/lu"

import { cn } from "../../utils"

const MenuRoot = DropdownMenuPrimitive.Root

const MenuTrigger = DropdownMenuPrimitive.Trigger

// Note: ContextMenuTrigger is not available in DropdownMenu
// If needed, import from @radix-ui/react-context-menu
const MenuContextTrigger = null

// Export MenuPortal for use in other components
export const MenuPortal = DropdownMenuPrimitive.Portal

const MenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    portalled?: boolean
    portalRef?: React.RefObject<HTMLElement>
  }
>(({ className, sideOffset = 4, portalled = true, portalRef, ...props }, ref) => {
  const Content = (
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )

  if (portalled) {
    return <DropdownMenuPrimitive.Portal container={portalRef?.current}>{Content}</DropdownMenuPrimitive.Portal>
  }

  return Content
})
MenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const MenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
MenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const MenuItemText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex-1", className)}
    {...props}
  />
))
MenuItemText.displayName = "MenuItemText"

const MenuItemCommand = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    )}
    {...props}
  />
))
MenuItemCommand.displayName = "MenuItemCommand"

const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <LuCheck className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
MenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <LuCircle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
MenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const MenuItemGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> & {
    title?: React.ReactNode
  }
>(({ className, title, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Group ref={ref} className={className} {...props}>
    {title && (
      <DropdownMenuPrimitive.Label className="px-2 py-1.5 text-xs font-semibold">
        {title}
      </DropdownMenuPrimitive.Label>
    )}
    {children}
  </DropdownMenuPrimitive.Group>
))
MenuItemGroup.displayName = DropdownMenuPrimitive.Group.displayName

const MenuRadioItemGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioGroup
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
MenuRadioItemGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const MenuArrow = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Arrow
    ref={ref}
    className={cn("fill-popover", className)}
    {...props}
  />
))
MenuArrow.displayName = DropdownMenuPrimitive.Arrow.displayName

interface MenuTriggerItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  startIcon?: React.ReactNode
  inset?: boolean
  className?: string
  children?: React.ReactNode
}

const MenuTriggerItem = React.forwardRef<
  React.ElementRef<typeof MenuItem>,
  MenuTriggerItemProps
>(({ className, children, startIcon, inset, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {startIcon}
    {children}
    <LuChevronRight className="ml-auto h-4 w-4" />
  </MenuItem>
))
MenuTriggerItem.displayName = "MenuTriggerItem"

export {
  MenuRoot,
  MenuTrigger,
  MenuContextTrigger,
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuItemCommand,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuItemGroup,
  MenuRadioItemGroup,
  MenuTriggerItem,
  MenuSeparator,
  MenuArrow,
}
