import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import ReservationSummary from './ReservationSummary';
import UserContext from '../context/User/UserContext.js';
import PopupContext from '../context/Popup/PopupContext.js';
import RestaurantContext from '../context/Restaurant/RestaurantContext.js';

const TableBooking = () => {
  const { showLogin, setShowLogin } = useContext(PopupContext)
  const { user } = useContext(UserContext)
  const { restaurantData ,setRestaurantData } = useContext(RestaurantContext)
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedTime, setSelectedTime] = useState('');
  const [isSummaryVisible, setIsSummaryVisible] = useState(false); // New state
  const [restaurant, setRestaurant] = useState({
    userId: '',
    guest: '',
    seats: '',
    bookingDate: '',
    timeSlot: ''
  })
  const navigate = useNavigate()

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
    { label: 'Morning', time: '08:00 AM to 12:00 PM', icon: '🌅' },
    { label: 'Lunch', time: '12:00 PM to 03:00 PM', icon: '🌞' },
    { label: 'Evening', time: '03:00 PM to 07:00 PM', icon: '⛅' },
    { label: 'Dinner', time: '07:00 PM to 10:00 PM', icon: '🌙' },
  ];

  const no_of_tables = Math.ceil(guestCount / 5); 

  const adddatainrestaurant = async () => {
    setRestaurant({
      ...restaurant,
      userId: user?.user?._id,
      guests: guestCount,
      seats: no_of_tables,
      bookingDate: new Date(selectedDate).toISOString().split('T')[0], // Format to YYYY-MM-DD
      timeSlot: selectedTime
    })
  }

  const handleRestaurantApi = async () => {
    try{
      const response = await fetch('https://magestic-ganges-inn-backend.onrender.com/api/v1/info/currentrestaurantbooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurant)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setRestaurantData(data.data)
        alert('Restaurant Booked Successfully');
        setIsSummaryVisible(true)
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.log(errorData);
        } else {
          console.error('Unexpected response format:', await response.text());
        }
      }
    } catch (error) {
      console.log(error)
    }}
    
  const hello = () => {
    console.log(`final = ${JSON.stringify(restaurant)}`);
  }

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
                    ((slot.label === 'Morning' && currentTime.getHours() >= 12) ||
                      (slot.label === 'Lunch' && (currentTime.getHours() < 12 || currentTime.getHours() >= 15)) ||
                      (slot.label === 'Evening' && (currentTime.getHours() < 15 || currentTime.getHours() >= 19)) ||
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

            {/*

            {/* Discount Info */}
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
              <h3 className="text-lg font-bold text-green-700">🎓 Student Exclusive</h3>
              <p className="text-sm text-green-700 mt-1">
                BHU / SMS / SHEPA students get <strong>15% off</strong>. Others: <strong>10% off</strong>.
                <br />
                <em>*ID card mandatory.</em>
              </p>
            </div>
            {/* Confirm Button */}
                  <div className="text-center mt-4">
                    <button
                    onClick={() => {
                      if (!user) {
                      setShowLogin(true);
                      } else {
                        adddatainrestaurant();
                        hello()
                      setSelectedTime('Confirmed');
                      }
                    }}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-6 py-3 rounded-lg text-lg font-semibold shadow ${
                      selectedTime === 'Confirmed'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-pointer hover:bg-gray-300'
                    }`}
                    >
                    {selectedTime === 'Confirmed' ? 'Confirmed' : 'Confirm'}
                    </button>
                  </div>

                  {/* Disable Proceed Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  handleRestaurantApi();
                }}
                disabled={!selectedDate || !selectedTime || selectedTime !== 'Confirmed'}
                className={`px-6 py-3 rounded-lg text-lg font-semibold shadow ${
                  !selectedDate || !selectedTime || selectedTime !== 'Confirmed'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Proceed to book the reservation
              </button>
            </div>
          </>
        ) : (
          <ReservationSummary
            guestCount={guestCount}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default TableBooking;
