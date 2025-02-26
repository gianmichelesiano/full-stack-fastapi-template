"use client"

import { useToast } from "../components/ui/use-toast"

const useCustomToast = () => {
  const { toast } = useToast()

  const showSuccessToast = (description: string) => {
    toast({
      title: "Success!",
      description,
      variant: "default",
    })
  }

  const showErrorToast = (description: string) => {
    toast({
      title: "Something went wrong!",
      description,
      variant: "destructive",
    })
  }

  return { showSuccessToast, showErrorToast }
}

export default useCustomToast
