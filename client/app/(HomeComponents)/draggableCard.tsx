import { motion } from "motion/react"
import { useEffect } from "react"



// type 
type Item = { id: string, title: string, date: string, startTime: string, endTime: string }

const cardVariant = [
  "bg-(--accent-peach) text-[color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-orange) text-[color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-yellow) text-[color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
]

// Change styling of card during drag animation
function onDrag(event: any, info: any, i: number, item:any) {
  const currentItem = document.getElementById(i.toString())
  if (info.offset.x > 0) {
      currentItem?.classList.add("animate-complete") 
  }
  if (info.offset.x < 0) {
    currentItem?.classList.add("animate-delete")
  }
}


//  trigger event at end of drag
function onDragEnd(event: any, info: any, i: number, item: Item, removeList: Function, user: any) {
  const currentItem = document.getElementById(i.toString())
  currentItem?.classList.remove("animate-complete", "animate-delete")
  if (info.offset.x > 50) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/completeEvent/?user=${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
      }),
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.message==="Event completed successfully."){
        currentItem?.classList.add("opacity-40")
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

export default function DraggableCard({ item, i, dradConstraintRef, removeList, User }: { item: any, i: number, dradConstraintRef: any, removeList: any, User: any }) {
    useEffect(()=>{
        const currentItem = document.getElementById(i.toString())
        item.colorId == "2" && currentItem?.classList.add("opacity-40")
    },[])

  return (
    <motion.div
      id={i.toString()}
      drag="x"
      dragConstraints={dradConstraintRef}
      onDragStart={(event, info) => onDrag(event, info, i, item)}
      onDragEnd={(event, info) => onDragEnd(event, info, i, item, removeList, User)}
      className={`relative flex flex-col gap-2 p-8 my-6 rounded-2xl ${cardVariant[i % cardVariant.length]}`}
    >
      <span className="font-bold">{item.title}</span>
      <h1>{item.startTime} - {item.endTime}</h1>
    </motion.div>
  )
}
