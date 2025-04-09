import React, { useContext, useState } from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import UserContext from '../context/User/UserContext'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const UserDetails = () => {
  const { user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState('current')

  const userInfo = user?.user

  const currentBookings = userInfo?.bookings?.current || []
  const previousBookings = userInfo?.bookings?.previous || []

  return (
    <div>
      <Navbar2 />

      {/* Profile Card */}
      <div className="flex justify-center items-center min-h-[20vh] py-8 px-4">
        <div 
          className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl w-full flex flex-row gap-5 items-center space-y-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.yellowbg})` }}
        >
          {/* Avatar and Welcome */}
          <div className="flex flex-col items-center space-y-2 backdrop-blur-md p-4 rounded-lg bg-white/70">
            <h2 className="text-xl font-semibold">Welcome back, {userInfo?.username}</h2>
            <p className="text-gray-500 text-sm">Role: {userInfo?.role}</p>
          </div>

          {/* Info Section */}
          <div className="w-full border-t border-gray-300 pt-4 space-y-4 bg-white bg-opacity-80 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-600">{userInfo?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Username:</span>
              <span className="text-gray-600">{userInfo?.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Membership:</span>
              {userInfo?.isMember ? (
                <span className="text-green-600 font-semibold">Active</span>
              ) : (
                <Link to="/#membership" className="text-blue-600 hover:underline font-medium">
                  Join Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <div className="flex justify-center gap-6 mb-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === 'current'
                ? 'bg-yellow-400 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('current')}
          >
            Current Bookings
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === 'previous'
                ? 'bg-yellow-400 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('previous')}
          >
            Previous Bookings
          </button>
        </div>

        {/* Booking Content */}
        <div className="bg-white shadow rounded-lg p-6 min-h-[150px] text-center">
          {activeTab === 'current' ? (
            currentBookings.length > 0 ? (
              <ul className="space-y-2">
                {currentBookings.map((booking, index) => (
                  <li key={index} className="text-gray-700">
                    Room {booking.roomNumber} - {booking.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You have no current bookings.</p>
            )
          ) : previousBookings.length > 0 ? (
            <ul className="space-y-2">
              {previousBookings.map((booking, index) => (
                <li key={index} className="text-gray-700">
                  Room {booking.roomNumber} - {booking.date}
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-500">No previous bookings found.</p>
              <Link
                to="/RoomBooking"
                className="inline-block px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-black"
              >
                Book a Room
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default UserDetails
