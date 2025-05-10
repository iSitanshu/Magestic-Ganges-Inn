import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/User/UserContext.js';
import LoginPopup from './LoginPopup';
import PopupContext from '../context/Popup/PopupContext.js';

const Navbar2 = () => {
  const { user, setUser } = useContext(UserContext);
  const { showLogin, setShowLogin } = useContext(PopupContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://magestic-ganges-inn-backend-qfvz.onrender.com/api/v1/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setUser(null);
        localStorage.removeItem('token');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };

  // Helper to navigate and scroll after redirect
  const navigateAndScroll = (path, hash) => {
    navigate(path);
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      {showLogin && <LoginPopup />}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-20 hover: cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#membersection"
            className="text-gray-800 font-medium hover:text-yellow-500 transition"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#membersection')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join
          </a>
          <NavLink to="/Contact" className="text-gray-800 font-medium hover:underline">
            Contact
          </NavLink>
          {!user && (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Login / Signup
            </button>
          )}
          {user && (
            <div className="relative">
              <button onClick={() => setShowDropdown((prev) => !prev)}>
                <i className="ri-user-fill text-3xl text-gray-800"></i>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <NavLink
                    to="/UserDetails"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={logoutUser}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Nav Section */}
      <ul className="flex justify-center space-x-6 py-4 bg-gray-100">
        <li>
          <NavLink to="/" className="text-gray-800 hover:text-yellow-500 transition">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/RestaurantBooking" className="text-gray-800 hover:text-yellow-500 transition">
            Dinning
          </NavLink>
        </li>
        <li>
          <NavLink to="/RoomBooking" className="text-gray-800 hover:text-yellow-500 transition">
            Room
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => navigateAndScroll('/', '#offersSection')}
            className="text-gray-800 hover:text-yellow-500 transition"
          >
            Offers
          </button>
        </li>
        <li>
          <button
            onClick={() => navigateAndScroll('/', '#locationsection')}
            className="text-gray-800 hover:text-yellow-500 transition"
          >
            Location
          </button>
        </li>
        <li>
          <button
            onClick={() => navigateAndScroll('/', '#galary')}
            className="text-gray-800 hover:text-yellow-500 transition"
          >
            Galary
          </button>
        </li>
      </ul>
    </>
  );
};

export default Navbar2;
