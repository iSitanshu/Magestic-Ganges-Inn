import React, { useContext, useState } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import PopupContext from '../context/Popup/PopupContext';
import UserContext from '../context/User/UserContext';
import RestaurantContext from '../context/Restaurant/RestaurantContext';
import HallContext from '../context/Hall/HallContext'
import { useNavigate } from 'react-router-dom';

const HallBooking = () => {
  const navigate  = useNavigate()
  const { showLogin, setShowLogin } = useContext(PopupContext);
  const { user } = useContext(UserContext);
  const { setHallData } = useContext(HallContext)
  // Bug Fix: Use appropriate context for halls if available. For now, reuse RestaurantContext.
  const { setRestaurantData } = useContext(RestaurantContext);

  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedTime, setSelectedTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const [hall, setHall] = useState({
    userId: '',
    eventName: '',
    method: '',
    bookingDate: '',
    timeSlot: ''
  });

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

  const handleConfirm = () => {
    setHall({
      userId: user?.user?._id,
      eventName,
      method: 'Online',
      bookingDate: new Date(selectedDate).toISOString().split('T')[0],
      timeSlot: selectedTime
    });
  };

  const handleHallApi = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/info/currenthallbooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hall)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setRestaurantData(data.data); // Replace with setHallData if available.
        alert('Hall Booked Successfully');
        setHallData(hall)
        navigate('/HallReservationsummary');
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.log(errorData);
        } else {
          console.error('Unexpected response:', await response.text());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Book a Hall</h1>

        {/* Date Selection */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Select a Date</h2>
          <div className="flex flex-wrap gap-2">
            {upcomingDates.map((d, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  selectedDate === d.date.toDateString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDate(d.date.toDateString())}
              >
                {d.label} <br />
                {d.date.getDate()}/{d.date.getMonth() + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Select a Time Slot</h2>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 border rounded-xl shadow transition ${
                  selectedTime === slot.label
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTime(slot.label)}
              >
                <div className="text-lg font-semibold">{slot.icon} {slot.label}</div>
                <div className="text-sm">{slot.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Type Input */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Type of Event</h2>
          <input
            type="text"
            placeholder="Enter event type (e.g., Wedding, Conference)"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Confirm Button */}
        <div className="text-center">
          <button
            onClick={() => {
              if (!user) {
                setShowLogin(true);
              } else {
                handleConfirm();
                setSelectedTime('Confirmed');
              }
            }}
            disabled={!selectedDate || !selectedTime || !eventName}
            className={`px-6 py-3 mt-4 rounded-lg text-lg font-semibold shadow ${
              selectedTime === 'Confirmed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
          >
            {selectedTime === 'Confirmed' ? 'Confirmed' : 'Confirm'}
          </button>
        </div>

        {/* Proceed Button */}
        <div className="text-center">
          <button
            onClick={handleHallApi}
            disabled={!selectedDate || !selectedTime || selectedTime !== 'Confirmed'}
            className={`px-6 py-3 mt-2 rounded-lg text-lg font-semibold shadow ${
              selectedTime !== 'Confirmed'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Proceed to book the hall
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HallBooking;