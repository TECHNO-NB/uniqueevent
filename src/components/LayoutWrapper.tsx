
// @ts-nocheck
"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

const LayoutWrapper = ({children}) => {
    const pathname=usePathname()
    const isAdmin = pathname.startsWith("/admin")
  return (
    <div className="w-screen h-screen">
       {!isAdmin && <Navbar/> }
       {children}
    </div>
  )
}

export default LayoutWrapper