import React from 'react'

const Navbar = () => {


  return (
    <nav className=' w-full font-sans mx-auto flex justify-between items-center bg-black text-white h-[50px] px-10 md:px-20'>
      <div className="logo font-bold text-2xl">
        <span> &lt;pass</span>
        <span className='text-green-400'>OP&gt;</span>
      </div>
      <ul className='flex gap-4 md:gap-8' >
        <li className='hover:font-bold'> <a href="">Home</a></li>
        <li className='hover:font-bold'> <a href="">About</a></li>
        <li className='hover:font-bold'> <a href="">Contact</a></li>
      </ul>



    </nav>
  )
}

export default Navbar
