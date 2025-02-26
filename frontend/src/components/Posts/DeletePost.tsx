import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FiTrash2 } from "react-icons/fi"
import { Button } from "@/components/ui/button"

import { PostsService } from "@/client"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useCustomToast from "@/hooks/useCustomToast"

const DeletePost = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const deletePost = async (id: string) => {
    await PostsService.deletePost({ id: id })
  }

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      showSuccessToast("The post was deleted successfully")
      setIsOpen(false)
    },
    onError: () => {
      showErrorToast("An error occurred while deleting the post")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const onSubmit = async () => {
    mutation.mutate(id)
  }

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive">
          <FiTrash2 fontSize="16px" />
          Delete Post
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="mb-4">
              This post will be permanently deleted. Are you sure? You will not
              be able to undo this action.
            </p>
          </DialogBody>

          <DialogFooter className="space-x-2">
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              variant="destructive"
              type="submit"
              loading={isSubmitting}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  )
}

export default DeletePost
