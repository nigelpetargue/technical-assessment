"use client"

import { useParams } from "next/navigation"
import { activities } from "./activities"

export default function ActivityPage() {
  const { activityId } = useParams()

  const content = activities[Number(activityId)] || (
    <div className='text-center text-red-500'>Activity not found!</div>
  )

  return (
    <div className='h-screen flex items-center justify-center relative flex-col'>
      {content}
    </div>
  )
}
