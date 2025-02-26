import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

import { type PostCreate, PostsService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import { Button } from "../ui/button"
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
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PostCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: PostCreate) =>
      PostsService.createPost({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Post created successfully.")
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

  const onSubmit: SubmitHandler<PostCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button value="add-post" className="my-4">
          <FaPlus className="mr-2 h-4 w-4" />
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Post</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="mb-4">Fill in the details to add a new post.</p>
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
                    required: "Title is required.",
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
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required.",
                  })}
                  placeholder="Description"
                  rows={4}
                />
              </Field>
            </div>
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
              variant="default"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddPost
