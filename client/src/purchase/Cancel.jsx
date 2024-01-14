import React from 'react'
import { Link } from 'react-router-dom'
import { GiCancel } from "react-icons/gi";
const Cancel = () => {
  return (
    < div className="h-screen flex flex-col justify-start items-center bg-gray-300">
    <div className="mx-12 mt-28  py-3 w-4/5 font-bold border-red-500 border-[3px] flex flex-row justify-center items-center bg-white drop-shadow-lg gap-1"><GiCancel className='text-red-700'/>Purchase Cancelled. Back to <Link className="text-blue-700" to="/">Home</Link></div>
   </div>
  )
}

export default Cancel