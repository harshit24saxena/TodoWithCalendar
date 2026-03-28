"use client"
import { useState } from "react"
import InputForm from "./inputForm"



function addTask() {
  const [toggle, setToggle] = useState(false)
  return (
  <>
    {toggle && <InputForm />}
    <button 
    onClick={()  => setToggle(!toggle)}
    className='bg-(--cta) z-2 fixed bottom-8 left-1/2 -translate-x-1/2 w-md h-md rounded-full shadow-(--cta) '>
      <svg className="w-md h-md" viewBox="0 0 100 100">
        <line fill="white" stroke="white" strokeWidth="5" id="top" x1="20" y1="50" x2="80" y2="50" />
        <line fill="white" stroke="white" strokeWidth="5" id="middle" x1="50" y1="20" x2="50" y2="80" />
      </svg>
    </button>
    <svg className="fixed bottom-0 sm:w-[500px]" viewBox="0 0 100 10">
      <path fill="var(--cta)" d="M 0 0 L 42 0 C 45 5 53 8 58 0 L 100 0 L 100 10 L 0 10 Z" />
      <path className="hidden sm:block" fill="var(--cta)" d="M 0 0 L 44 0 C 45 5 53 8 56 0 L 100 0 L 100 10 L 0 10 Z" />
    </svg>
  </>
  )
}

export default addTask