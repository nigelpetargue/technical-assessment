"use client"

import Auth from "@/components/Auth"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import { MdDelete, MdOutlineAdd } from "react-icons/md"
import { BiLogOutCircle } from "react-icons/bi"
import { signOut } from "@/lib/auth"

export default function SupabaseTodoLis() {
  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [isLoadTodos, setIsLoadTodos] = useState(false)

  const handleCreateTask = async () => {
    const newTask = {
      title,
      completed: false,
    }

    if (title.trim()) {
      const { error } = await supabase.from("todos").insert([newTask])

      if (error) {
        console.log(error)
      } else {
        setIsLoadTodos(true)
        setTitle("")
      }
    }
  }

  const handleToggleCompleted = async (id, completed) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id)

    if (error) {
      console.log(error.message)
    } else {
      setIsLoadTodos(true)
    }
  }

  const handleRemoveTask = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id)

    if (error) {
      console.log(error.message)
    } else {
      setIsLoadTodos(true)
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user)

      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user)
      })

      return () => {
        authListener.unsubscribe()
      }
    }

    fetchSession()
  }, [])

  useEffect(() => {
    const handleFetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("title", { ascending: true })

      if (error) {
        console.log(error.message)
      } else {
        setTasks(data)
        setIsLoadTodos(false)
      }
    }

    handleFetchTodos()
  }, [isLoadTodos])

  return (
    <div className='w-full max-w-md p-6 mt-14 bg-white border rounded-2xl shadow-xl flex flex-col items-center space-y-6'>
      <h1 className='text-2xl font-semibold text-gray-800'>Supabase To-Do List</h1>

      {!user ? (
        <Auth user={user} />
      ) : (
        <>
          <button onClick={signOut}>
            <BiLogOutCircle size={24} />
          </button>
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
            {tasks.length > 0 &&
              tasks.map(({ id, title, completed }, index) => (
                <div key={index} className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      className='border-gray-300 h-5 w-5'
                      checked={completed}
                      onChange={() => handleToggleCompleted(id, completed)}
                    />
                    <span
                      className={`text-lg ${
                        completed ? "line-through text-gray-500" : "text-black"
                      }`}
                    >
                      {title}
                    </span>
                  </div>

                  <button onClick={() => handleRemoveTask(id)}>
                    <MdDelete color='red' size={24} />
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
