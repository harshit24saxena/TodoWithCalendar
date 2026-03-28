"use client"
import { motion, useMotionValue } from "motion/react"
import { useRef, useState } from "react";
  const cardVariant = [
    "bg-(--accent-peach) text-[color-mix(in_srgb,var(--accent-peach),black_20%)] shadow-[-10px_0_color-mix(in_srgb,var(--accent-peach),black_10%)] drop-shadow-lg",
    "bg-(--accent-orange) text-[color-mix(in_srgb,var(--accent-orange),black_20%)] shadow-[-10px_0_color-mix(in_srgb,var(--accent-orange),black_10%)] drop-shadow-lg",
    "bg-(--accent-yellow) text-[color-mix(in_srgb,var(--accent-yellow),black_20%)] shadow-[-10px_0_color-mix(in_srgb,var(--accent-yellow),black_10%)] drop-shadow-lg",
  ];
  const blog = [
    {
      title: "Understanding React Server Components",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      title: "The Power of Tailwind CSS",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      title: "Mastering TypeScript",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      title: "Building Accessible Web Apps",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      title: "Next.js App Router Guide",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
  ];

type Event = MouseEvent | TouchEvent | PointerEvent

export default function BlogList() {

  const dragConstraintsRef = useRef(null)
  const [draggedItem, setDraggedItem] = useState<boolean | null>(false)

  function dragEnd(i:number,x:any) {
    let currentDragElement = document.getElementById(i.toString())
    let elementPosition = x.get()
    if(elementPosition < -50){
      console.log("left side drag" ,x)
      currentDragElement?.classList.add("bg-green-400")
    }else if(elementPosition > 50  ) {
      console.log("right side drag", elementPosition)
      currentDragElement?.classList.add("opacity-25")
    }
    setDraggedItem(true)
  }
  return (
    <div ref={dragConstraintsRef}>
      {blog.map((item, i) => {
        const x = useMotionValue(0);
        return (
          <motion.div id={i.toString()} drag="x" style={{x}} dragMomentum={false} dragConstraints={dragConstraintsRef} onDragEnd={()=>dragEnd(i,x)} draggable={false}
            key={i} className={`flex flex-col gap-2 p-8 my-6 rounded-2xl ${cardVariant[i % cardVariant.length]}`}>
            <span className="font-bold"> {item.title} </span>
            <h1 className="text-(--text-primary)">{item.description}</h1>
          </motion.div>

        )
      })}

    </div>
  );
}