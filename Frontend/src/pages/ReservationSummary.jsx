import React, { useContext } from 'react';
import UserContext from '../context/User/UserContext';
import LoginPopup from '../components/LoginPopup';

const ReservationSummary = ({ guestCount, selectedDate, selectedTime }) => {
  const { user } = useContext(UserContext);

  return (
    <section className="mt-24 p-6 max-w-4xl mx-auto space-y-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="flex justify-center items-center min-h-[20vh] py-8 px-4">
        <div
          className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl w-full flex flex-row gap-5 items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.yellowbg})` }}
        >
          {/* Avatar and Welcome */}
          <div className="flex flex-col items-center space-y-2 backdrop-blur-md p-4 rounded-lg bg-white/70">
            <h2 className="text-xl font-semibold">
              Welcome back, {userInfo?.username}
            </h2>
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
                <Link
                  to="/#membership"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Join Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800">Reservation Summary</h2>
      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span className="font-semibold">{user.user.username}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span className="font-semibold">{user.user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">No of Guests:</span>
          <span className="font-semibold">{guestCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span className="font-semibold">{selectedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Time:</span>
          <span className="font-semibold">{selectedTime}</span>
        </div>
      </div>
    </section>
  );
};

export default ReservationSummary;
