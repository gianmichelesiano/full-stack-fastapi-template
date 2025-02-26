"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "../../utils"
import { CloseButton } from "./close-button"

const DrawerRoot = DrawerPrimitive.Root

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    portalled?: boolean
    portalRef?: React.RefObject<HTMLElement>
    offset?: string | number
  }
>(({ className, children, portalled = true, portalRef, offset, ...props }, ref) => {
  const Content = (
    <>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          className
        )}
        style={{ paddingBottom: offset }}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </DrawerPrimitive.Content>
    </>
  )

  if (portalled) {
    return <DrawerPrimitive.Portal container={portalRef?.current}>{Content}</DrawerPrimitive.Portal>
  }

  return Content
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

const DrawerBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4", className)} {...props} />
)
DrawerBody.displayName = "DrawerBody"

const DrawerBackdrop = DrawerOverlay

const DrawerCloseTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-4 top-4",
      className
    )}
    {...props}
  >
    <CloseButton size="sm" />
  </DrawerPrimitive.Close>
))
DrawerCloseTrigger.displayName = "DrawerCloseTrigger"

const DrawerActionTrigger = DrawerPrimitive.Close

export {
  DrawerRoot,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerActionTrigger,
}
