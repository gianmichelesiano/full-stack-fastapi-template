import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import Logo from "/assets/images/fastapi-logo.svg"
import UserMenu from "./UserMenu"

function Navbar() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkScreenSize()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (isMobile) {
    return null
  }

  return (
    <div className="flex justify-between sticky top-0 items-center bg-muted/50 w-full p-4 text-white">
      <Link to="/">
        <img src={Logo} alt="Logo" className="max-w-[200px] p-2" />
      </Link>
      <div className="flex gap-2 items-center">
        <UserMenu />
      </div>
    </div>
  )
}

export default Navbar
