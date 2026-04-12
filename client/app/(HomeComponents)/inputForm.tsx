import { useStore } from "../store"
import { useSearchParams } from 'next/navigation'
import { motion } from "motion/react"

export default function InputForm() {
const {addList, setAddFormToggle}:any = useStore()
const searchParams = useSearchParams()
const user = searchParams.get("user")

async function formSubmit(formData:any){
  addList(formData.get("title"), formData.get("date"), formData.get("startTime"), formData.get("endTime"))
  setAddFormToggle(false)

  const res = await fetch("http://localhost:8000/addEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      user: user,
    }),
  })
}
    return (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black/50 z-1">
            <form action={formSubmit} className="bg-foreground fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 flex flex-col gap-4 justify-center items-center max-w-[500px] w-10/12 h-contain px-sm py-md rounded-2xl shadow-lg shadow-gray-700">
                <motion.input type="text" name="title" whileHover={{scale: 1.05}} placeholder="Task" className="w-full h-1/6 p-2 bg-(--accent-orange) border-(--cta) border-b text-(--bg-primary) rounded-md shadow-md shadow-gray-400 focus:bg-foreground focus:outline-none focus:border-(--cta) focus:border-b-2 focus:rounded-none focus:text-black " />
                <motion.input type="date" onClick={(e) => e.currentTarget.showPicker()} name="date" whileHover={{scale: 1.05}} placeholder="Date"  className="w-full h-1/6 p-2 bg-(--accent-peach) border-(--cta) border-b text-(--bg-primary) rounded-md shadow-md shadow-gray-400 focus:bg-foreground focus:outline-none focus:border-(--cta) focus:border-b-2 focus:rounded-none focus:text-black " />
                <div className="flex gap-2 w-full">
                <motion.input type="time" onClick={(e) => e.currentTarget.showPicker()} name="startTime" whileHover={{scale: 1.05}} placeholder="startTime"  className="w-full h-1/6 p-2 bg-(--accent-yellow) border-(--cta) border-b text-(--bg-primary) rounded-md shadow-md shadow-gray-400 focus:bg-foreground focus:outline-none focus:border-(--cta) focus:border-b-2 focus:rounded-none focus:text-black " />       
                <motion.input type="time" onClick={(e) => e.currentTarget.showPicker()} name="endTime" whileHover={{scale: 1.05}} placeholder="endTime"  className="w-full h-1/6 p-2 bg-(--accent-yellow) border-(--cta) border-b text(--bg-primary) rounded-md shadow-md shadow-gray-400 focus:bg-foreground focus:outline-none focus:border-(--cta) focus:border-b-2 focus:rounded-none focus:text-black " />
                </div>
                <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} type="submit" className="bg-(--cta) w-full py-2 rounded-xl shadow-md shadow-gray-400 active:bg-(--cta-dark) active:rounded-full">Add</motion.button>
            </form>
        </div>
    );
}