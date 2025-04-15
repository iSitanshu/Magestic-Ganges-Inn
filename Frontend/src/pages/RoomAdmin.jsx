import React, { useContext, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import UserContext from "../context/User/UserContext";

const RoomAdmin = () => {
  const { user } = useContext(UserContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert("Both Start Date and End Date are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/v1/info/fromtobooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromDate: startDate,
          toDate: endDate,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming API returns an array of bookings in data.data
        console.log(data)
        setBookings(data?.data || []);
      } else {
        console.error("Error fetching bookings:", await response.text());
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
        <h1 className="text-2xl font-bold mb-4">Search Bookings by Date Range</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
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
              No bookings found for the selected date range.
            </p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((booking, index) => (
                <li key={index} className="p-4 border rounded shadow">
                  <p>
                    <strong>From:</strong>{" "}
                    {formatDate(booking.fromDate)}
                  </p>
                  <p>
                    <strong>To:</strong> {formatDate(booking.toDate)}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.guests || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status || "N/A"}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{" "}
                    {booking.totalPrice
                      ? booking.totalPrice.toLocaleString()
                      : "N/A"}
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

export default RoomAdmin;