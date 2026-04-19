"use client"

import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { useStore } from "../store"
import { useEffect } from "react"

// type 
type Item = { id: string, title: string, date: string, startTime: string, endTime: string }

const cardVariant = [
  "bg-(--accent-peach) text-[color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-orange) text-[color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-yellow) text-[color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
]

// Change styling of card during drag animation
function onDrag(event: any, info: any, i: number, addCompletedTask: any, item:any) {
  const currentItem = document.getElementById(i.toString())
  if (info.offset.x > 5) {
    currentItem?.classList.add("bg-green-500/40", "text-white")
    addCompletedTask(item.id)
  }
  if (info.offset.x < 5) {
    currentItem?.classList.add("bg-red-900", "text-white")
  }
}


//  trigger event at end of drag
function onDragEnd(event: any, info: any, i: number, item: Item, removeList: Function, user: any) {
  const currentItem = document.getElementById(i.toString())
  currentItem?.classList.remove("bg-red-900")
  if (info.offset.x > 100) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/completeEvent/?user=${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        user: user,
      }),
    }).then(res=>res.json()).then(data=>{
      if(data.message==="Event completed successfully."){
        currentItem?.classList.add("bg-green-500/40", "text-white")
      }
    })
  }
  if (info.offset.x < -50) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEvent/?user=${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        user: user,
      }),
    }).then(res => res.json()).then(data => {
      if (data.message === "Event deleted successfully.") {
        removeList(item.title, item.date, item.startTime, item.endTime)
        window.location.reload()
      }
    })
  }
}


// Dragable card 
function DraggableCard({ item, i, dradConstraintRef, removeList, User, CompletedTask, addCompletedTask }: { item: any, i: number, dradConstraintRef: any, removeList: any, User: any, CompletedTask: any, addCompletedTask: any }) {
    const currentItem = document.getElementById(i.toString())
    CompletedTask.forEach((completedItem: any) => {
    if(completedItem === item.id){
      currentItem?.classList.add("bg-green-500/40", "text-white")
    }
  })

  return (
    <motion.div
      id={i.toString()}
      drag="x"
      dragConstraints={dradConstraintRef}
      onDragStart={(event, info) => onDrag(event, info, i, addCompletedTask, item)}
      onDragEnd={(event, info) => onDragEnd(event, info, i, item, removeList, User)}
      className={`flex flex-col gap-2 p-8 my-6 rounded-2xl ${cardVariant[i % cardVariant.length]}`}
    >
      <span className="font-bold">{item.title}</span>
      <h1>{item.startTime} - {item.endTime}</h1>
    </motion.div>
  )
}


// Main Component
export default function BlogList({user}: {user?: string}) {
  const { list, addList, removeList, setUser, addCompletedTask, completedTask }: any = useStore()
  const dradConstraintRef = useRef(null)
  const router = useRouter();

  useEffect(() => {
    setUser(user)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/?user=${user}`) 
      .then(res =>{ 
        if(res.status === 404) return router.push("/login")
        return res.json()
      })
      .then(data => {
        if(!data) return
        if(data.message == "No events found.") 
          {return "No events found."} 
        else {data.forEach((item: any) => {
            addList(item.id, item.summary, item.start.dateTime.slice(11, 19), item.end.dateTime.slice(11, 19))
        })}
      })
  }, [])

  return (
    <div ref={dradConstraintRef}>
      {list.length == 0 ? <p className="text-black text-2xl">No events found.</p> : list.map((item: any, i: number) => (
        <DraggableCard 
        key={i} item={item} i={i} User={user} CompletedTask={completedTask} 
        addCompletedTask={addCompletedTask} dradConstraintRef={dradConstraintRef} removeList={removeList} 
        />
      ))}
    </div>
  )
}