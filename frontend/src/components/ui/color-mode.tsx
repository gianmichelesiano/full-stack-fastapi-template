"use client"

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { Button } from "./button"
import { cn } from "../../utils"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <NextThemesProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

interface ColorModeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton({ className, ...props }, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      ref={ref}
      className={cn("rounded-full", className)}
      {...props}
    >
      <ColorModeIcon />
    </Button>
  )
})
ColorModeButton.displayName = "ColorModeButton"

export const LightMode = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function LightMode({ className, ...props }, ref) {
  return (
    <span
      className={cn("contents text-foreground light", className)}
      ref={ref}
      {...props}
    />
  )
})
LightMode.displayName = "LightMode"

export const DarkMode = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function DarkMode({ className, ...props }, ref) {
  return (
    <span
      className={cn("contents text-foreground dark", className)}
      ref={ref}
      {...props}
    />
  )
})
DarkMode.displayName = "DarkMode"
