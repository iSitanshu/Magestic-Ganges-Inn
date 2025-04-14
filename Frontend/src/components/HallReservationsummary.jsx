import React, { useContext } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import UserContext from '../context/User/UserContext';
import HallContext from '../context/Hall/HallContext';
import { useNavigate } from 'react-router-dom';

const HallReservationsummary = () => {
  const { user } = useContext(UserContext);
  const { HallData } = useContext(HallContext); 
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar2 />
      <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Hall Reservation Summary
        </h1>
        <div className="space-y-4">
          <div>
            <span className="block text-gray-600 font-medium">Event Name:</span>
            <span className="text-lg text-gray-800">{HallData.eventName}</span>
          </div>
          <div>
            <span className="block text-gray-600 font-medium">Booking Date:</span>
            <span className="text-lg text-gray-800">{HallData.bookingDate}</span>
          </div>
          <div>
            <span className="block text-gray-600 font-medium">Time Slot:</span>
            <span className="text-lg text-gray-800">{HallData.timeSlot}</span>
          </div>
          <div>
            <span className="block text-gray-600 font-medium">Reserved By:</span>
            <span className="text-lg text-gray-800">{user?.user?.username || 'Guest'}</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={
                navigate('/UserDetails')
            }
          >
            Go to Profile
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HallReservationsummary;