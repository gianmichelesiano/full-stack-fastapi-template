import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createFileRoute } from "@tanstack/react-router"

import Appearance from "@/components/UserSettings/Appearance"
import ChangePassword from "@/components/UserSettings/ChangePassword"
import DeleteAccount from "@/components/UserSettings/DeleteAccount"
import UserInformation from "@/components/UserSettings/UserInformation"
import useAuth from "@/hooks/useAuth"

const tabsConfig = [
  { value: "my-profile", title: "My profile", component: UserInformation },
  { value: "password", title: "Password", component: ChangePassword },
  { value: "appearance", title: "Appearance", component: Appearance },
  { value: "danger-zone", title: "Danger zone", component: DeleteAccount },
]

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
})

function UserSettings() {
  const { user: currentUser } = useAuth()
  const finalTabs = currentUser?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig
  
  if (!currentUser) {
    return null
  }
  
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold text-center md:text-left py-12">
        User Settings
      </h1>
      
      <Tabs defaultValue="my-profile" className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-8">
          {finalTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="px-4 py-2">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {finalTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="p-4">
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}