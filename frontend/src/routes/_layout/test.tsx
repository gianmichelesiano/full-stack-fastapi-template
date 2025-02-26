import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { useState } from "react"
import { FiAlertCircle, FiCheck, FiInfo, FiMail, FiUser } from "react-icons/fi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group"
import { Field } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogCloseTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Schema di validazione per i parametri di ricerca
const testSearchSchema = z.object({
  page: z.coerce.number().catch(1),
})

// Componente principale
export function Test() {
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState("option1")
  const { toast } = useToast()

  return (
    <div className="w-full space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Shadcn UI Showcase</h1>
        <p className="text-muted-foreground">
          This page demonstrates various components styled with Shadcn UI.
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="text-sm text-muted-foreground">Card Description</p>
          </div>
          <div className="p-4">
            <p>This is a card component that can be used to display content.</p>
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm" className="ml-2">Submit</Button>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-semibold">Form Elements</h3>
            <p className="text-sm text-muted-foreground">Input fields and controls</p>
          </div>
          <div className="space-y-4 pt-4">
            <Field label="Username">
              <InputGroup startElement={<FiUser />}>
                <Input placeholder="Enter your username" />
              </InputGroup>
            </Field>
            <Field label="Email">
              <InputGroup startElement={<FiMail />}>
                <Input placeholder="Enter your email" />
              </InputGroup>
            </Field>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-semibold">Buttons</h3>
            <p className="text-sm text-muted-foreground">Button variants</p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/15 border-l-4 border-primary p-4 rounded-md">
            <div className="flex items-start">
              <FiInfo className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-primary">Information</h3>
                <p className="text-sm">This is an information message.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-destructive/15 border-l-4 border-destructive p-4 rounded-md">
            <div className="flex items-start">
              <FiAlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-destructive">Error</h3>
                <p className="text-sm">This is an error message.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-500/15 border-l-4 border-green-500 p-4 rounded-md">
            <div className="flex items-start">
              <FiCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-500">Success</h3>
                <p className="text-sm">This is a success message.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dialog</h2>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              This is a dialog component from Shadcn UI. It can be used to display content that requires user attention or interaction.
            </DialogDescription>
            <div className="py-4">
              <p>Dialog content goes here.</p>
            </div>
            <DialogFooter>
              <DialogCloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogCloseTrigger>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </div>

      {/* Radio Group Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Radio Group</h2>
        <div className="space-y-2">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <Radio value="option1" id="option1">
              Option 1
            </Radio>
            <Radio value="option2" id="option2">
              Option 2
            </Radio>
            <Radio value="option3" id="option3">
              Option 3
            </Radio>
          </RadioGroup>
        </div>
      </div>

      {/* Toast Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Toast Notifications</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              toast({
                title: "Success",
                description: "Your action was completed successfully.",
                variant: "default",
              })
            }}
          >
            Show Success Toast
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              toast({
                title: "Error",
                description: "There was an error with your action.",
                variant: "destructive",
              })
            }}
          >
            Show Error Toast
          </Button>
        </div>
      </div>
    </div>
  )
}

// Definizione della route
export const Route = createFileRoute("/_layout/test")({
  component: Test,
  validateSearch: (search) => testSearchSchema.parse(search),
})
