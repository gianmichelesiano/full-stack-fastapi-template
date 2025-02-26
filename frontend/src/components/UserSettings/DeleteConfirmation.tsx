import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import { type ApiError, UsersService } from "@/client"
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
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const DeleteConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const { logout } = useAuth()

  const mutation = useMutation({
    mutationFn: () => UsersService.deleteUserMe(),
    onSuccess: () => {
      showSuccessToast("Your account has been successfully deleted")
      setIsOpen(false)
      logout()
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })

  const onSubmit = async () => {
    mutation.mutate()
  }

  return (
    <>
      <DialogRoot
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button variant="destructive" className="mt-4">
            Delete
          </Button>
        </DialogTrigger>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogCloseTrigger />
            <DialogHeader>
              <DialogTitle>Confirmation Required</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p className="mb-4">
                All your account data will be{" "}
                <strong>permanently deleted.</strong> If you are sure, please
                click <strong>"Confirm"</strong> to proceed. This action cannot
                be undone.
              </p>
            </DialogBody>

            <DialogFooter className="space-x-2">
              <div className="flex space-x-2">
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
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default DeleteConfirmation
