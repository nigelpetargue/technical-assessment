import { useState } from "react"

export default function GrowButton() {
  const [size, setSize] = useState(1)
  const [color, setColor] = useState("#000000")

  const handleGrowButton = () => {
    setSize((prev) => prev * 2)
    setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
  }

  const handleReset = () => {
    setSize(1)
    setColor("#000000")
  }

  return (
    <>
      <button
        onClick={handleGrowButton}
        className='text-white px-6 py-3 rounded-lg shadow-md transition-all duration-500 transform'
        style={{ transform: `scale(${size})`, backgroundColor: color }}
      >
        GROW
      </button>

      <button
        onClick={handleReset}
        className='bg-gray-500 text-white rounded-md py-2 px-4 absolute top-14 right-5 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300'
      >
        Reset
      </button>
    </>
  )
}
