import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (< div className="h-screen flex flex-col justify-start items-center bg-gray-300">
    <div className="mx-12 mt-28  py-3 w-4/5 font-bold border-green-500 border-[3px] text-center bg-white drop-shadow-lg">Purchase Successfull! Back to <Link className="text-blue-700" to="/">Home</Link></div>
   </div>
  )
}

export default Success