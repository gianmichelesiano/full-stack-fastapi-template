import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
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
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditPost post={post} />
        <DeletePost id={post.id} />
      </MenuContent>
    </MenuRoot>
  )
}