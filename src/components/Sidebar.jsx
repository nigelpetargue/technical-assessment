"use client"

import { routes } from "@/lib/routes"
import dynamic from "next/dynamic"
import Link from "next/link"

const Drawer = dynamic(() => import("react-modern-drawer"), {
  ssr: false,
})

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction='left'>
      <div className='h-full flex flex-col py-6 px-3 space-y-4'>
        {routes.map(({ name, path }, index) => (
          <Link
            className='text-sm text-gray-700 hover:text-blue-500 transition duration-200 ease-in-out px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={() => setIsOpen(false)}
            key={index}
            href={path}
          >
            {name}
          </Link>
        ))}
      </div>
    </Drawer>
  )
}
