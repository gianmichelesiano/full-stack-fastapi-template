import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock, FiUser } from "react-icons/fi"

import type { UserRegister } from "@/client"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group"
import { PasswordInput } from "@/components/ui/password-input"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"
import { confirmPasswordRules, emailPattern, passwordRules } from "@/utils"
import Logo from "/assets/images/fastapi-logo.svg"

export const Route = createFileRoute("/signup")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

interface UserRegisterForm extends UserRegister {
  confirm_password: string
}

function SignUp() {
  const { signUpMutation } = useAuth()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit: SubmitHandler<UserRegisterForm> = (data) => {
    signUpMutation.mutate(data)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center h-screen">
        <form
          className="flex flex-col items-stretch justify-center h-screen max-w-sm mx-auto gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            src={Logo}
            alt="FastAPI logo"
            className="h-auto max-w-[16rem] self-center mb-4"
          />
          <Field
            invalid={!!errors.full_name}
            errorText={errors.full_name?.message}
          >
            <InputGroup className="w-full" startElement={<FiUser />}>
              <Input
                id="full_name"
                minLength={3}
                {...register("full_name", {
                  required: "Full Name is required",
                })}
                placeholder="Full Name"
                type="text"
              />
            </InputGroup>
          </Field>

          <Field invalid={!!errors.email} errorText={errors.email?.message}>
            <InputGroup className="w-full" startElement={<FiUser />}>
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
          <PasswordInput
            type="password"
            startElement={<FiLock />}
            {...register("password", passwordRules())}
            placeholder="Password"
            errors={errors}
          />
          <PasswordInput
            type="confirm_password"
            startElement={<FiLock />}
            {...register("confirm_password", confirmPasswordRules(getValues))}
            placeholder="Confirm Password"
            errors={errors}
          />
          <Button variant="default" type="submit" loading={isSubmitting}>
            Sign Up
          </Button>
          <p className="text-sm">
            Already have an account?{" "}
            <RouterLink to="/login" className="main-link">
              Log In
            </RouterLink>
          </p>
        </form>
      </div>
    </>
  )
}

export default SignUp
