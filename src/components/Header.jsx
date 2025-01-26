"use client"

import { MdMenu } from "react-icons/md"
import Sidebar from "./Sidebar"
import { useState } from "react"
import "react-modern-drawer/dist/index.css"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='border-b absolute w-full h-12 flex items-center px-5 z-20'>
        <button onClick={() => setIsOpen(true)}>
          <MdMenu size={24} />
        </button>
      </div>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
