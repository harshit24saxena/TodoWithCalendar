"use client"
import {useStore} from "../store"
import {motion} from "motion/react"
import { useRouter } from "next/navigation"

function Hamburger() {
    const router = useRouter()
    const logout = () => {
        router.push("/login")
    }
    const { navToggle, setNavToggle }:any = useStore()
    return (
        <div className="flex flex-col gap-2 absolute top-1/2 right-0 p-sm">
            <button onClick={() => {setNavToggle(!navToggle), logout() }} className="bg-(--cta) w-full py-2 rounded-xl shadow-md shadow-gray-400 active:bg-(--cta-dark) p-sm">
               logout
            </button>
        </div>
    )
}

export default function Navbar() {
    const {navToggle, setNavToggle}:any = useStore()
    return (
        <nav className="relative flex justify-between items-center my-sm p-md pt-sm">
            <h1 className="text-black font-bold text-4xl ">Daily Task</h1>
            <svg 
             onClick={() => setNavToggle(!navToggle)}
             className="w-5 h-5 cursor-pointer" viewBox="0 0 100 100">
                <motion.line 
                animate={{y: navToggle ? 30 : 0, rotate: navToggle ? 45 : 0}}
                transition={navToggle ? {y:{duration:0.2}, rotate:{delay:0.3}}: {y:{delay:0.2}, rotate:{delay:0, duration:0.2}}}
                fill="black" stroke="black" strokeWidth="8" id="top" x1="10" y1="20" x2="90" y2="20" />

                <motion.line 
                animate={{rotate: navToggle ? -45 : 0}}
                transition={navToggle? {rotate:{delay:0.3}}: {rotate:{delay:0, duration:0}}} 
                fill="black" stroke="black" strokeWidth="8" id="middle" x1="10" y1="50" x2="90" y2="50" />

                <motion.line 
                animate={{y: navToggle ? -30 : 0, opacity: navToggle ? 0 : 1}}
                transition={navToggle ? {y:{duration:0.2}, opacity:{delay:0.2, duration:0.2}} : { opacity:{delay:0, duration:0.2}, y:{delay:0.2, duration:0.2}}}
                fill="black" stroke="black" strokeWidth="8" id="bottom" x1="10" y1="80" x2="90" y2="80" />
            </svg>
            {navToggle && <Hamburger />}
        </nav>
    );
}      