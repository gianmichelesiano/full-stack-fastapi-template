import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { type ApiError, type PostPublic, PostsService } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
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
} from "../ui/dialog"
import { Field } from "../ui/field"

interface EditPostProps {
  post: PostPublic
}

interface PostUpdateForm {
  title: string
  description: string
}

const EditPost = ({ post }: EditPostProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      ...post,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: PostUpdateForm) =>
      PostsService.updatePost({ id: post.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Post updated successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const onSubmit: SubmitHandler<PostUpdateForm> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaExchangeAlt fontSize="16px" />
          Edit Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="mb-4">Update the post details below.</p>
            <div className="flex flex-col space-y-4">
              <Field
                required
                invalid={!!errors.title}
                errorText={errors.title?.message}
                label="Title"
              >
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  placeholder="Title"
                  type="text"
                />
              </Field>
              <Field
                required
                invalid={!!errors.description}
                errorText={errors.description?.message}
                label="Description"
              >
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Description"
                  rows={4}
                />
              </Field>
            </div>
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
              <Button variant="default" type="submit" loading={isSubmitting}>
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default EditPost
