"use client"
import { motion } from "motion/react"
import { useRef } from "react"
import { useStore } from "../store"

const cardVariant = [
  "bg-(--accent-peach) text-[color-mix(in_oklab,var(--accent-peach)_100%,#000F0F_30%)]",
  "bg-(--accent-orange) text-[color-mix(in_oklab,var(--accent-orange)_100%,#000F0F_30%)]",
  "bg-(--accent-yellow) text-[color-mix(in_oklab,var(--accent-yellow)_100%,#000F0F_30%)]",
]



function DraggableCard({item, i, dradConstraintRef, removeList }:{item:any, i:number, dradConstraintRef:any, removeList:any}) {
  return (
    <motion.div
      id={i.toString()}
      drag="x"
      dragConstraints={dradConstraintRef}
      onDragEnd={(event, info) => {
        console.log(info)
        if (info.offset.x > 100) {
          const currentItem = document.getElementById(i.toString())
          console.log("Right swipe", currentItem?.classList.add("opacity-50"))
        } else if (info.offset.x < -100) {
          console.log("Left swipe", i)
          removeList(item.title, item.date)
        }
      }}
      className={`flex flex-col gap-2 p-8 my-6 rounded-2xl ${cardVariant[i % cardVariant.length]}`}
    >
      <span className="font-bold">{item.title}</span>
      <h1>{item.description}</h1>
    </motion.div>
  )
}

export default function BlogList() {
  const {list, removeList}:any = useStore()
  const dradConstraintRef = useRef(null)
  return (
    <div ref={dradConstraintRef}>
      {list.map((item:any, i:number) => (
        <DraggableCard key={i} item={item} i={i} dradConstraintRef={dradConstraintRef} removeList={removeList} />
      ))}
    </div>
  )
}