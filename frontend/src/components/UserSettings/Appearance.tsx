import { useTheme } from "../../theme"

import { Radio, RadioGroup } from "@/components/ui/radio"

const Appearance = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="container max-w-full">
      <h2 className="text-sm font-bold py-4">
        Appearance
      </h2>

      <RadioGroup
        onValueChange={(value) => setTheme(value as "dark" | "light" | "system")}
        value={theme}
      >
        <div className="flex flex-col space-y-2">
          <Radio value="system">System</Radio>
          <Radio value="light">Light Mode</Radio>
          <Radio value="dark">Dark Mode</Radio>
        </div>
      </RadioGroup>
    </div>
  )
}
export default Appearance
