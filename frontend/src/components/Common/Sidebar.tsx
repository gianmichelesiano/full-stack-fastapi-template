import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"

import type { UserPublic } from "@/client"
import useAuth from "@/hooks/useAuth"
import { Button } from "../ui/button"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "../ui/drawer"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile */}
      <DrawerRoot
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute z-50 m-4"
            aria-label="Open Menu"
          >
            <FaBars className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-xs left-0 right-auto rounded-r-[10px] rounded-t-none h-full">
          <DrawerCloseTrigger />
          <DrawerBody>
            <div className="flex flex-col justify-between h-full">
              <div>
                <SidebarItems />
                <button
                  onClick={() => {
                    logout()
                  }}
                  className="flex items-center gap-4 px-4 py-2 w-full text-left"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
              {currentUser?.email && (
                <p className="text-sm p-2 truncate max-w-sm">
                  Logged in as: {currentUser.email}
                </p>
              )}
            </div>
          </DrawerBody>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>

      {/* Desktop */}
      <div className="hidden md:flex sticky top-0 bg-muted/30 min-w-[320px] h-screen p-4">
        <div className="w-full">
          <SidebarItems />
        </div>
      </div>
    </>
  )
}

export default Sidebar

