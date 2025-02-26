import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"

import { useState } from "react"
import { FaExchangeAlt } from "react-icons/fa"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  DialogActionTrigger,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog"

import { type UserPublic, type UserUpdate, UsersService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { emailPattern, handleError } from "@/utils"
import { Checkbox } from "../ui/checkbox"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field } from "../ui/field"

interface EditUserProps {
  user: UserPublic
}

interface UserUpdateForm extends UserUpdate {
  confirm_password?: string
}

const EditUser = ({ user }: EditUserProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: user,
  })

  const mutation = useMutation({
    mutationFn: (data: UserUpdateForm) =>
      UsersService.updateUser({ userId: user.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("User updated successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const onSubmit: SubmitHandler<UserUpdateForm> = async (data) => {
    if (data.password === "") {
      data.password = undefined
    }
    mutation.mutate(data)
  }

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <FaExchangeAlt fontSize="16px" />
          Edit User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="mb-4">Update the user details below.</p>
            <div className="flex flex-col space-y-4">
              <Field
                required
                invalid={!!errors.email}
                errorText={errors.email?.message}
                label="Email"
              >
                <Input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: emailPattern,
                  })}
                  placeholder="Email"
                  type="email"
                />
              </Field>

              <Field
                invalid={!!errors.full_name}
                errorText={errors.full_name?.message}
                label="Full Name"
              >
                <Input
                  id="name"
                  {...register("full_name")}
                  placeholder="Full name"
                  type="text"
                />
              </Field>

              <Field
                required
                invalid={!!errors.password}
                errorText={errors.password?.message}
                label="Set Password"
              >
                <Input
                  id="password"
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Password"
                  type="password"
                />
              </Field>

              <Field
                required
                invalid={!!errors.confirm_password}
                errorText={errors.confirm_password?.message}
                label="Confirm Password"
              >
                <Input
                  id="confirm_password"
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === getValues().password ||
                      "The passwords do not match",
                  })}
                  placeholder="Password"
                  type="password"
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-col space-y-4">
              <Controller
                control={control}
                name="is_superuser"
                render={({ field }) => (
                  <Field>
                    <Checkbox
                      checked={field.value === true}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    >
                      Is superuser?
                    </Checkbox>
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <Field>
                    <Checkbox
                      checked={field.value === true}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    >
                      Is active?
                    </Checkbox>
                  </Field>
                )}
              />
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
            <Button variant="default" type="submit" loading={isSubmitting}>
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </form>
      </DialogContent>
    </DialogRoot>
  )
}

export default EditUser
