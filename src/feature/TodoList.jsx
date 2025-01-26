"use client"

import { useEffect, useState } from "react"
import { MdDelete, MdOutlineAdd } from "react-icons/md"

export default function TodoList() {
  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState([])

  const handleCreateTask = () => {
    const newTask = {
      title,
      completed: false,
    }

    if (title.trim()) {
      setTasks((prev) => [...prev, newTask])
      setTitle("")
    }
  }

  const handleToggleCompleted = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((item, i) => i !== index)
    setTasks(updatedTasks)
  }

  return (
    <div className='w-full max-w-md p-6 bg-white border rounded-2xl shadow-xl flex flex-col items-center space-y-6'>
      <h1 className='text-2xl font-semibold text-gray-800'>To-Do List</h1>

      <div className='flex items-center w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm'>
        <input
          type='text'
          className='w-full p-3 outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
          placeholder='Write your task...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleCreateTask}
          className='p-3 bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-all'
        >
          <MdOutlineAdd size={24} />
        </button>
      </div>

      <div className='w-full  h-96 overflow-y-auto space-y-3'>
        {tasks.length > 0 ? (
          tasks.map(({ title, completed }, index) => (
            <div key={index} className='flex justify-between items-center w-full'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='border-gray-300 h-5 w-5'
                  checked={completed}
                  onChange={() => handleToggleCompleted(index)}
                />
                <span
                  className={`text-lg ${
                    completed ? "line-through text-gray-500" : "text-black"
                  }`}
                >
                  {title}
                </span>
              </div>

              <button onClick={() => handleRemoveTask(index)}>
                <MdDelete color='red' size={24} />
              </button>
            </div>
          ))
        ) : (
          <p className='text-center text-2xl font-bold'>No tasks in the list</p>
        )}
      </div>
    </div>
  )
}
