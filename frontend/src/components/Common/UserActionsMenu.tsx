import { BsThreeDotsVertical } from "react-icons/bs"
import { Button } from "../ui/button"
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu"

import type { UserPublic } from "@/client"
import DeleteUser from "../Admin/DeleteUser"
import EditUser from "../Admin/EditUser"

interface UserActionsMenuProps {
  user: UserPublic
  disabled?: boolean
}

export const UserActionsMenu = ({ user, disabled }: UserActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          disabled={disabled}
        >
          <BsThreeDotsVertical className="h-4 w-4" />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <EditUser user={user} />
        <DeleteUser id={user.id} />
      </MenuContent>
    </MenuRoot>
  )
}
