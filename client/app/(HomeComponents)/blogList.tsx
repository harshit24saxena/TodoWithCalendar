"use client"
import { motion } from "motion/react"
import { useRef } from "react"
import { useStore } from "../store"

type Item = { title: string, date: string }

const cardVariant = [
  "bg-(--accent-peach) text-[color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-orange) text-[color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
  "bg-(--accent-yellow) text-[color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%)] shadow-[-8px_0_color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%),0_5px_5px_2px_rgba(0,0,0,0.3)]",
]

function onDrag(event: any, info: any, i: number) {
  const currentItem = document.getElementById(i.toString())
  if (info.offset.x > 5) {
    currentItem?.classList.add("bg-green-500/40", "text-white")
  }
  if (info.offset.x < 5) {
    currentItem?.classList.add("bg-red-900", "text-white")
  }
}
function onDragEnd(event: any, info: any,i:number, item: Item, removeList: Function) {
  const currentItem = document.getElementById(i.toString())
  currentItem?.classList.remove("bg-green-500/40", "text-white", "bg-red-900", "text-white")
  if (info.offset.x > 100) {
    alert("task completed")
  }
  if (info.offset.x < -100) {
    removeList(item.title, item.date)
  }
}

function DraggableCard({ item, i, dradConstraintRef, removeList }: { item: any, i: number, dradConstraintRef: any, removeList: any }) {
  return (
    <motion.div
      id={i.toString()}
      drag="x"
      dragConstraints={dradConstraintRef}
      onDragStart={(event, info) => onDrag(event, info, i,)}
      onDragEnd={(event, info) => onDragEnd(event, info,i, item, removeList)}
      className={`flex flex-col gap-2 p-8 my-6 rounded-2xl ${cardVariant[i % cardVariant.length]}`}
    >
      <span className="font-bold">{item.title}</span>
      <h1>{item.description}</h1>
    </motion.div>
  )
}

export default function BlogList() {
  const { list, removeList }: any = useStore()
  const dradConstraintRef = useRef(null)
  return (
    <div ref={dradConstraintRef}>
      {list.map((item: any, i: number) => (
        <DraggableCard key={i} item={item} i={i} dradConstraintRef={dradConstraintRef} removeList={removeList} />
      ))}
    </div>
  )
}