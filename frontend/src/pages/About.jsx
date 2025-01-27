import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className="flex font-semibold justify-center items-center gap-2 text-xl sm:text-4xl pt-5 pb-7">
          <h2 className="text-indigo-500">About</h2>
          <h2 className="text-orange-500">Us</h2>
        </div>
        <div className="navbar flex flex-col items-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
          <img className='h-20' src={assets.Student} alt="Programmer" />
        </div>
      
    </div>
  )
}

export default About
