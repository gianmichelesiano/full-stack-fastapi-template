"use client"

import { type PropsWithChildren } from "react"
import { ThemeProvider } from "../../theme"
import { Toaster } from "./toaster"

export function CustomProvider(props: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="system">
      {props.children}
      <Toaster />
    </ThemeProvider>
  )
}
