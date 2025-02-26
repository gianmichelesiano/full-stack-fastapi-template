import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type UserPublic,
  type UserUpdateMe,
  UsersService,
} from "@/client"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { emailPattern, handleError } from "@/utils"
import { Button } from "../ui/button"
import { Field } from "../ui/field"
import { Input } from "../ui/input"

const UserInformation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const [editMode, setEditMode] = useState(false)
  const { user: currentUser } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<UserPublic>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
    },
  })

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const mutation = useMutation({
    mutationFn: (data: UserUpdateMe) =>
      UsersService.updateUserMe({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("User updated successfully.")
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit: SubmitHandler<UserUpdateMe> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    toggleEditMode()
  }

  return (
    <div className="container max-w-full">
      <h2 className="text-sm font-bold py-4">
        User Information
      </h2>
      <form 
        className="w-full md:w-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field label="Full name">
          {editMode ? (
            <Input
              {...register("full_name", { maxLength: 30 })}
              type="text"
            />
          ) : (
            <p
              className={`py-2 truncate max-w-sm ${!currentUser?.full_name ? "text-muted-foreground" : ""}`}
            >
              {currentUser?.full_name || "N/A"}
            </p>
          )}
        </Field>
        <Field
          className="mt-4"
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          {editMode ? (
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: emailPattern,
              })}
              type="email"
            />
          ) : (
            <p className="py-2 truncate max-w-sm">
              {currentUser?.email}
            </p>
          )}
        </Field>
        <div className="flex mt-4 gap-3">
          <Button
            variant={editMode ? "default" : "default"}
            onClick={toggleEditMode}
            type={editMode ? "button" : "submit"}
            loading={editMode ? isSubmitting : false}
            disabled={editMode ? !isDirty || !getValues("email") : false}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
          {editMode && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserInformation
