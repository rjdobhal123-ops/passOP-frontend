import React from 'react'

const Footer = () => {
  return (
    <div className='font-sans mx-auto flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center bg-black text-white h-[60px] px-10 md:px-20  bottom-0 w-full'>
      <div className="logo font-bold text-2xl">
        <span> &lt;pass</span>
        <span className='text-green-400'>OP&gt;</span>
      </div>

      <div className='text-lg'> <span className='text-green-400'>Tech stack:</span> React, Tailwind, MongoDB</div>
      <div>Created by @RajatDobhal</div>
    </div>
  )
}

export default Footer
