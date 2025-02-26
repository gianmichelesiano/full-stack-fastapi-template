import { Link } from "@tanstack/react-router"
import { FaUserAstronaut } from "react-icons/fa"
import { FiLogOut, FiUser } from "react-icons/fi"

import useAuth from "@/hooks/useAuth"
import { Button } from "../ui/button"
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu"

const UserMenu = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <div>
      {/* Desktop */}
      <div className="flex">
        <MenuRoot>
          <MenuTrigger asChild>
            <Button 
              data-testid="user-menu" 
              variant="default" 
              className="max-w-sm truncate"
            >
              <FaUserAstronaut className="mr-2 h-4 w-4" />
              <span>{user?.full_name || "User"}</span>
            </Button>
          </MenuTrigger>

          <MenuContent>
            <Link to="/settings">
              <MenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                <FiUser className="h-4 w-4" />
                <div className="flex-1">My Profile</div>
              </MenuItem>
            </Link>

            <MenuItem
              className="flex items-center gap-2 py-2 cursor-pointer"
              onClick={handleLogout}
            >
              <FiLogOut className="h-4 w-4" />
              <span>Log Out</span>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </div>
    </div>
  )
}

export default UserMenu
