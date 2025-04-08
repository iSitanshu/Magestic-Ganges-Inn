import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { UserContext } from '../context/User/UserContext'


const Navbar = () => {
  const { user } = useContext(UserContext)
  return (
    <>
    <nav className="flex justify-between items-center px-6 py-4 text-white">
            <i className="text-black ri-menu-fill text-3xl cursor-pointer"></i>
            <img src={assets.logo} alt="Logo" className="h-10" />
            <h3 className="text-black text-lg font-medium cursor-pointer hover:underline">Contact</h3>
            {user ? (
              <i
                className="text-black ri-user-fill text-3xl cursor-pointer"
                onClick={() => window.location.href = '/UserDetails'}
              ></i>
            ) : null}
          </nav>

          {/* Nav Links */}
          <ul className="flex justify-center space-x-6 mt-10 text-white text-lg font-semibold tracking-wide">
            <li className="text-black hover:text-yellow-300 cursor-pointer transition">Room</li>
            <li className="text-black hover:text-yellow-300 cursor-pointer transition">Offers</li>
            <li className="text-black hover:text-yellow-300 cursor-pointer transition">Dining</li>
            <li className="text-black hover:text-yellow-300 cursor-pointer transition">Location</li>
            <li className="text-black hover:text-yellow-300 cursor-pointer transition">Gallery</li>
          </ul>
    </>
  )
}

export default Navbar