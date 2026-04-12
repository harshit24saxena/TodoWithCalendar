import { useStore } from "../store"
import { useSearchParams } from 'next/navigation'

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
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-1">
            <form action={formSubmit} className="bg-foreground fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 flex flex-col gap-4 justify-center items-center max-w-[500px] w-10/12 h-contain p-sm rounded-2xl">
                <input type="text" name="title" placeholder="Task" className="w-full h-1/6 p-2 rounded-xl border border-(--cta) text-black" />
                <input type="date" name="date" placeholder="Date"  className="w-full h-1/6 p-2 rounded-xl border border-(--cta) text-black" />
                <input type="time" name="startTime" placeholder="startTime"  className="w-full h-1/6 p-2 rounded-xl border border-(--cta) text-black" />
                <input type="time" name="endTime" placeholder="endTime"  className="w-full h-1/6 p-2 rounded-xl border border-(--cta) text-black" />
                <button type="submit" className="bg-(--cta) w-full py-2 rounded-xl">Add</button>
            </form>
        </div>
    );
}