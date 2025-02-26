import { BsThreeDotsVertical } from "react-icons/bs"
import { Button } from "../ui/button"
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu"

import type { PostPublic } from "@/client"
import DeletePost from "../Posts/DeletePost"
import EditPost from "../Posts/EditPost"

interface PostActionsMenuProps {
  post: PostPublic
}

export const PostActionsMenu = ({ post }: PostActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <BsThreeDotsVertical className="h-4 w-4" />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <EditPost post={post} />
        <DeletePost id={post.id} />
      </MenuContent>
    </MenuRoot>
  )
}
