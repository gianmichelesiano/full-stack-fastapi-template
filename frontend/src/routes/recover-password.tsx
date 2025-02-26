import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiMail } from "react-icons/fi"

import { type ApiError, LoginService } from "@/client"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group"
import { isLoggedIn } from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { emailPattern, handleError } from "@/utils"

interface FormData {
  email: string
}

export const Route = createFileRoute("/recover-password")({
  component: RecoverPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function RecoverPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()
  const { showSuccessToast } = useCustomToast()

  const recoverPassword = async (data: FormData) => {
    await LoginService.recoverPassword({
      email: data.email,
    })
  }

  const mutation = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      showSuccessToast("Password recovery email sent successfully.")
      reset()
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <form
      className="flex flex-col items-stretch justify-center h-screen max-w-sm mx-auto gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold text-center mb-2 text-primary">
        Password Recovery
      </h1>
      <p className="text-center">
        A password recovery email will be sent to the registered account.
      </p>
      <Field invalid={!!errors.email} errorText={errors.email?.message}>
        <InputGroup className="w-full" startElement={<FiMail />}>
          <Input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: emailPattern,
            })}
            placeholder="Email"
            type="email"
          />
        </InputGroup>
      </Field>
      <Button variant="default" type="submit" loading={isSubmitting}>
        Continue
      </Button>
    </form>
  )
}
