import { motion } from "motion/react"
import { useEffect } from "react"
import { completeEventApiCall, deleteEventApiCall } from "./functions"
import { Item } from "../../type"

const cardVariant = [
  "bg-(--accent-peach) text-[color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-orange) text-[color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-yellow) text-[color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
]

// Change styling of card during drag animation
function onDrag(event: any, info: any, i: number, item: any) {
  const currentItem = document.getElementById(item.id)
  if (info.offset.x > 0) {
    currentItem?.classList.add("animate-complete")
  }
  if (info.offset.x < 0) {
    currentItem?.classList.add("animate-delete")
  }
}

//  trigger event at end of drag
function onDragEnd(event: any, info: any, i: number, item: Item, removeList: Function, completeList: Function, user: string) {
  const currentItem = document.getElementById(item.id)
  currentItem?.classList.remove("animate-complete", "animate-delete")
  if (info.offset.x > 50) {
    completeEventApiCall(user, item)
    completeList(item.id)
    currentItem?.classList.add("opacity-70")
  }
  if (info.offset.x < -50) {
    deleteEventApiCall(user, item)
    removeList(item.id)
  }
}

export default function DraggableCard({ item, i, dragConstraintRef, removeList, completeList, User }: { item: Item, i: number, dragConstraintRef: any, removeList: any, completeList: any, User: string }) {
    useEffect(() => {
    const currentItem = document.getElementById(item.id)
    item.colorId == 2 && currentItem?.classList.add("opacity-40")
  }, [item.colorId])

  return (
    <motion.div
      id={item.id}
      drag="x"
      dragConstraints={dragConstraintRef}
      onDragStart={(event, info) => onDrag(event, info, i, item)}
      onDragEnd={(event, info) => onDragEnd(event, info, i, item, removeList, completeList, User)}
      className={`relative flex flex-col gap-2 p-8 my-6 rounded-2xl ${cardVariant[i % cardVariant.length]}`}
    >
      <p className="font-bold">{item.title}</p>
      <h1>{item.startTime} - {item.endTime}</h1>
    </motion.div>
  )
}
