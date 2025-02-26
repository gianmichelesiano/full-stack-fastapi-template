import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FiTrash2 } from "react-icons/fi"
import { Button } from "@/components/ui/button"

import { ItemsService } from "@/client"
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

const DeleteItem = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const deleteItem = async (id: string) => {
    await ItemsService.deleteItem({ id: id })
  }

  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      showSuccessToast("The item was deleted successfully")
      setIsOpen(false)
    },
    onError: () => {
      showErrorToast("An error occurred while deleting the item")
    },
    onSettled: () => {
      queryClient.invalidateQueries()
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
          Delete Item
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="mb-4">
              This item will be permanently deleted. Are you sure? You will not
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

export default DeleteItem
