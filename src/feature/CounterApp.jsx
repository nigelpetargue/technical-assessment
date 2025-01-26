"use client"

import { useState } from "react"

export default function CounterApp() {
  const [counter, setCounter] = useState(0)

  const handleIncrementCounter = () => setCounter((prev) => prev + 1)
  const handleDecrementCounter = () => setCounter((prev) => prev - 1)
  const handleResetCounter = () => setCounter(0)

  return (
    <div className='w-1/2 h-1/2 md:w-1/6 flex flex-col items-center'>
      <p className='text-3xl font-bold'>Counter App</p>

      <div className='flex-1 flex flex-col justify-center items-center'>
        <p className='text-7xl font-bold'>{counter}</p>
        <p className='font-bold'>{counter % 2 === 0 ? "Even" : "Odd"}</p>
        <button
          onClick={handleResetCounter}
          className='bg-slate-200 rounded-md py-2 px-3 mt-5'
        >
          Reset
        </button>
      </div>

      <div className='w-full flex justify-between'>
        <button
          onClick={handleDecrementCounter}
          className='bg-red-400 text-white rounded-md py-2 px-3'
        >
          Decrement
        </button>
        <button
          onClick={handleIncrementCounter}
          className='bg-green-400 text-white rounded-md py-2 px-3'
        >
          Increment
        </button>
      </div>
    </div>
  )
}
