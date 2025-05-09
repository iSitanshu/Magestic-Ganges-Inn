import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

const RestaurantAdmin = () => {
  const [specificDate, setSpecificDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleSearch = async () => {
    if (!specificDate) {
      alert("Please select a date");
      return;
    }
    try {
      const response = await fetch("https://magestic-ganges-inn-backend.onrender.com/api/v1/info/fromtoRestaurantBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specificDate }),
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data?.data || []);
      } else {
        console.error("Error fetching restaurant bookings:", await response.text());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar2 />
      <div className="max-w-3xl mx-auto p-8 my-10 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Search Restaurant Bookings by Date</h1>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={specificDate}
            onChange={(e) => setSpecificDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <div className="mt-8">
          {bookings.length === 0 ? (
            <p className="text-gray-500">
              No restaurant bookings found for the selected date.
            </p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((booking, index) => (
                <li key={index} className="p-4 border rounded shadow">
                  <p>
                    <strong>Username:</strong>{" "}
                    {booking.username || booking.userId || "N/A"}
                  </p>
                  <p>
                    <strong>Seats:</strong> {booking.seats || "N/A"}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.guests || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(booking.bookingDate)}
                  </p>
                  <p>
                    <strong>Time Slot:</strong> {booking.timeSlot || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantAdmin;