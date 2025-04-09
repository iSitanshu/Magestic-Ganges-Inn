import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/User/UserContext';

const TableBooking = () => {
  const { user } = useContext(UserContext)
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedTime, setSelectedTime] = useState('');
  const [isSummaryVisible, setIsSummaryVisible] = useState(false); // New state

  const handleGuestChange = (type) => {
    setGuestCount((prev) =>
      type === 'increment' ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const upcomingDates = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date,
      label: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  });

  const timeSlots = [
    { label: 'Lunch', time: '12:00 PM to 03:00 PM', icon: '🌞' },
    { label: 'Dinner', time: '07:00 PM to 10:00 PM', icon: '🌙' },
  ];

  const no_of_tables = Math.floor(guestCount / 5) + 1;
 console.log(user.user);
 

  return (
    <>
      <Navbar2 />
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-xl rounded-2xl mt-10">
        {!isSummaryVisible ? (
          <>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">Book a Table</h1>
              <p className="text-gray-600">Majestic Ganges Inn</p>
            </div>

            {/* Guest Counter */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">No. of Guests</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleGuestChange('decrement')}
                  className="bg-gray-200 text-xl px-4 py-1 rounded hover:bg-gray-300 transition duration-200 ease-in-out"
                >
                  −
                </button>
                <span className="text-lg font-medium text-gray-700">{guestCount}</span>
                <button
                  onClick={() => handleGuestChange('increment')}
                  className="bg-gray-200 text-xl px-4 py-1 rounded hover:bg-gray-300 transition duration-200 ease-in-out"
                >
                  +
                </button>
                <span className="text-yellow-500 text-md font-medium">No of seat: {no_of_tables}</span>
              </div>
              <span className="text-green-500 text-sm font-medium">Note: Maximum of 5 people for 1 seat</span>
            </div>

            {/* Date Selector */}
            <div>
              <h2 className="text-xl font-semibold mb-2">When are you visiting?</h2>
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {upcomingDates.map(({ date, label, discount }, index) => {
                  const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  });
                  const isSelected = selectedDate === date.toDateString();
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date.toDateString())}
                      className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg border cursor-pointer min-w-[70px] ${
                        isSelected ? 'bg-orange-100 border-orange-400' : 'bg-gray-50'
                      }`}
                    >
                      <span className="font-semibold">{label}</span>
                      <span className="text-sm">{formattedDate}</span>
                      <span className="text-green-600 text-xs font-medium">{discount}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Select Time</h2>
              <div className="space-y-4">
                {timeSlots.map((slot, index) => {
                  const currentTime = new Date();
                  const isToday = selectedDate === currentTime.toDateString();
                  const isSlotDisabled =
                    isToday &&
                    ((slot.label === 'Lunch' && currentTime.getHours() >= 15) ||
                      (slot.label === 'Dinner' && currentTime.getHours() >= 22) ||
                      (slot.label === 'Dinner' && currentTime.getHours() < 19));

                  return (
                    <div
                      key={index}
                      onClick={() => !isSlotDisabled && setSelectedTime(slot.label)}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer ${
                        selectedTime === slot.label ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'
                      } ${isSlotDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{slot.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold">{slot.label}</h3>
                          <p className="text-sm text-gray-600">{slot.time}</p>
                        </div>
                      </div>
                      {!isSlotDisabled && <span>⌄</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Discount Info */}
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
              <h3 className="text-lg font-bold text-green-700">🎓 Student Exclusive</h3>
              <p className="text-sm text-green-700 mt-1">
                BHU / SMS / SHEPA students get <strong>15% off</strong>. Others: <strong>10% off</strong>.
                <br />
                <em>*ID card mandatory.</em>
              </p>
            </div>

            {/* Proceed Button */}
            <div className="text-center">
              <button
                onClick={() => setIsSummaryVisible(true)} // Toggle state
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
              >
                Proceed to book the reservation
              </button>
            </div>
          </>
        ) : (
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default TableBooking;
