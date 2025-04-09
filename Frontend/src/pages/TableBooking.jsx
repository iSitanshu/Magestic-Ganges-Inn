import React, { useState } from 'react';
import { assets } from '../assets/assets';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

const TableBooking = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedTime, setSelectedTime] = useState('');

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

  return (
    <>
    <Navbar2 />
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-xl rounded-2xl mt-10">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Book a Table</h1>
        <p className="text-gray-600">Majestic Ganges Inn</p>
      </div>

      {/* Guest Counter */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">No. of Guests</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleGuestChange('decrement')}
            className="bg-gray-200 text-xl px-4 py-1 rounded hover:bg-gray-300"
          >
            −
          </button>
          <span className="text-lg">{guestCount}</span>
          <button
            onClick={() => handleGuestChange('increment')}
            className="bg-gray-200 text-xl px-4 py-1 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
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
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              onClick={() => setSelectedTime(slot.label)}
              className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer ${
                selectedTime === slot.label ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{slot.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold">{slot.label}</h3>
                  <p className="text-sm text-gray-600">{slot.time}</p>
                </div>
              </div>
              <span>⌄</span>
            </div>
          ))}
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
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow">
          Proceed
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default TableBooking;
