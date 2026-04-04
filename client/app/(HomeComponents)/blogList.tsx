"use client"
import { motion, useMotionValue, useTransform } from "motion/react"
import { useRef } from "react"

const cardVariant = [
  "bg-(--accent-peach)",
  "bg-(--accent-orange)",
  "bg-(--accent-yellow)",
]

const blog = [
  { title: "Understanding React Server Components", description: "..." },
  { title: "The Power of Tailwind CSS", description: "..." },
  { title: "Mastering TypeScript", description: "..." },
  { title: "Building Accessible Web Apps", description: "..." },
  { title: "Next.js App Router Guide", description: "..." },
]

function DraggableCard({item, i, dradConstraintRef }:{item:any, i:number, dradConstraintRef:any}) {
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
  const dradConstraintRef = useRef(null)
  return (
    <div ref={dradConstraintRef}>
      {blog.map((item, i) => (
        <DraggableCard key={i} item={item} i={i} dradConstraintRef={dradConstraintRef} />
      ))}
    </div>
  )
}