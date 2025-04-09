import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserContext from '../context/User/UserContext'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const UserDetails = () => {
  const { user } = useContext(UserContext)

  const userInfo = user?.user

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center space-y-6">
          {/* Avatar and Welcome */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src={assets.avatar || 'https://i.pravatar.cc/150?img=3'}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow"
            />
            <h2 className="text-xl font-semibold">Welcome back, {userInfo?.username}</h2>
            <p className="text-gray-500 text-sm">Role: {userInfo?.role}</p>
          </div>

          {/* Info Section */}
          <div className="w-full border-t border-gray-200 pt-4 space-y-4">
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
                <Link
                  to="/"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Join Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
      <div>
        <span>Previous Booking</span>
        <span>Current Booking</span>
      </div>
      <div>
        all the previous booking if any if not displa
      </div>
      </div>

      <Footer />
    </div>
  )
}

export default UserDetails
