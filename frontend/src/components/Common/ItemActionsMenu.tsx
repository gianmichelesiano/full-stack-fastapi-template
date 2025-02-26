import { BsThreeDotsVertical } from "react-icons/bs"
import { Button } from "../ui/button"
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu"

import type { ItemPublic } from "@/client"
import DeleteItem from "../Items/DeleteItem"
import EditItem from "../Items/EditItem"

interface ItemActionsMenuProps {
  item: ItemPublic
}

export const ItemActionsMenu = ({ item }: ItemActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <BsThreeDotsVertical className="h-4 w-4" />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <EditItem item={item} />
        <DeleteItem id={item.id} />
      </MenuContent>
    </MenuRoot>
  )
}
