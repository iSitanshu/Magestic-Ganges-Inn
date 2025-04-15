import React, { useContext } from 'react';
import UserContext from '../context/User/UserContext';
import LoginPopup from '../components/LoginPopup';

const ReservationSummary = ({ guestCount, selectedDate, selectedTime }) => {
  const { user } = useContext(UserContext);

  return (
    <section className="mt-24 p-6 max-w-4xl mx-auto space-y-8 bg-white rounded-2xl shadow-xl border border-gray-200">
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
