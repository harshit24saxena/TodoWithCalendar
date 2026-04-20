"use client"
import DraggableCard from "./draggableCard"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { useStore } from "../store"
import { useEffect } from "react"


// Main Component
export default function BlogList({user}: {user?: string}) {
  const { list, addList, removeList, setUser }: any = useStore()
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
            addList(item.id, item.summary, item.start.dateTime.slice(11, 19), item.end.dateTime.slice(11, 19), item.colorId)
        })}
      })
  }, [])

  return (
    <div ref={dradConstraintRef}>
      {list.length == 0 ? <p className="text-black text-2xl">No events found.</p> : list.map((item: any, i: number) => (
        <DraggableCard 
        key={i} item={item} i={i} User={user} dradConstraintRef={dradConstraintRef} removeList={removeList} 
        />
      ))}
    </div>
  )
}