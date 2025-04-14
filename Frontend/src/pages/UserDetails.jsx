import React, { useContext, useState, useEffect } from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import UserContext from "../context/User/UserContext";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

// Component for rendering booking list (works for all categories)
const BookingList = ({ bookings, emptyMessage }) => {
  if (bookings.length === 0)
    return <p className="text-gray-500">{emptyMessage}</p>;
  return (
    <ul className="space-y-4">
      {bookings.map((booking, index) => (
        <li
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left Info */}
            <div className="space-y-1">
              <div className="text-lg font-semibold text-gray-800">
                Room {booking.roomNumber}
              </div>
              <div className="text-sm text-gray-600">
                <strong>From:</strong>{" "}
                {new Date(booking.fromDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">
                <strong>To:</strong>{" "}
                {new Date(booking.toDate).toLocaleDateString()}
              </div>
            </div>
            {/* Right Info */}
            <div className="space-y-1 text-sm text-right sm:text-left">
              <div className="text-gray-700">
                <strong>Guests:</strong> {booking.guests || "N/A"}
              </div>
              <div className="text-gray-800 font-medium">
                <strong>Total:</strong>{" "}
                ₹{booking.totalPrice?.toLocaleString() || "N/A"}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const UserDetails = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("current");
  // Room bookings (for "current" and "previous" tabs)
  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  // Restaurant bookings
  const [currentRestaurantBookings, setCurrentRestaurantBookings] = useState([]);
  const [prevRestaurantBookings, setPrevRestaurantBookings] = useState([]);
  // Hall bookings
  const [currentHallBooking, setCurrentHallBooking] = useState([]);
  const [prevHallBooking, setPrevHallBooking] = useState([]);

  const userInfo = user?.user;

  // Fetch Room Previous Bookings
  const handlePreviousBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/info/previousbookingdetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user._id }),
      });
      if (response.ok) {
        const data = await response.json();
        const allBookings = data?.data || [];
        const today = new Date();
        const past = [];
        const upcoming = [];
        allBookings.forEach((booking) => {
          const toDate = new Date(booking.toDate);
          if (toDate < today) past.push(booking);
          else upcoming.push(booking);
        });
        setCurrentBookings(upcoming);
        setPreviousBookings(past);
      } else {
        const errorData = await response.json();
        if (response.status === 404)
          alert("You have no previous room bookings.");
        else console.error("Fetch error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Fetch Restaurant Previous Bookings
  const handleRestaurantPreviousBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/info/previousrestaurantbooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user._id }),
      });
      if (response.ok) {
        const data = await response.json();
        const allBookings = data?.data || [];
        const today = new Date();
        const past = [];
        const upcoming = [];
        allBookings.forEach((booking) => {
          const toDate = new Date(booking.toDate);
          if (toDate < today) past.push(booking);
          else upcoming.push(booking);
        });
        setCurrentRestaurantBookings(upcoming);
        setPrevRestaurantBookings(past);
      } else {
        const errorData = await response.json();
        if (response.status === 404)
          alert("You have no previous restaurant bookings.");
        else console.error("Fetch error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Fetch Hall Previous Bookings (Assuming you have an endpoint for hall bookings)
  const handleHallPreviousBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/info/previousrestaurantbooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user._id }),
      });
      if (response.ok) {
        const data = await response.json();
        const allBookings = data?.data || [];
        const today = new Date();
        const past = [];
        const upcoming = [];
        allBookings.forEach((booking) => {
          const toDate = new Date(booking.toDate);
          if (toDate < today) past.push(booking);
          else upcoming.push(booking);
        });
        setCurrentHallBooking(upcoming);
        setPrevHallBooking(past);
      } else {
        const errorData = await response.json();
        if (response.status === 404)
          alert("You have no previous hall bookings.");
        else console.error("Fetch error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Fetch previous bookings when switching tabs; call only the corresponding function.
  useEffect(() => {
    if (activeTab === "previous" && previousBookings.length === 0) {
      handlePreviousBooking();
    } else if (
      activeTab === "previousRestaurant" &&
      prevRestaurantBookings.length === 0
    ) {
      handleRestaurantPreviousBooking();
    } else if (
      activeTab === "previousHall" &&
      prevHallBooking.length === 0
    ) {
      handleHallPreviousBooking();
    }
  }, [activeTab]);

  return (
    <div>
      <Navbar2 />

      {/* Profile Card */}
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

      {/* Booking Sections */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-semibold mb-4">Room Bookings</h2>
        <div className="flex justify-center gap-6 mb-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === "current" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("current")}
          >
            Current Bookings
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === "previous" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("previous")}
          >
            Previous Bookings
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 min-h-[150px] text-center">
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                if (activeTab === "current") setCurrentBookings([]);
                else if (activeTab === "previous") setPreviousBookings([]);
              }}
            >
              ✕
            </button>
          </div>
          {activeTab === "current" ? (
            <BookingList
              bookings={currentBookings}
              emptyMessage="You have no current room bookings."
            />
          ) : (
            <BookingList
              bookings={previousBookings}
              emptyMessage="No previous room bookings found."
            />
          )}
        </div>
      </div>

      {/* Restaurant Booking Section */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-semibold mb-4">Restaurant Bookings</h2>
        <div className="flex justify-center gap-6 mb-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === "currentRestaurant" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("currentRestaurant")}
          >
            Current Restaurant Bookings
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === "previousRestaurant" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("previousRestaurant")}
          >
            Previous Restaurant Bookings
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 min-h-[150px] text-center">
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                if (activeTab === "currentRestaurant")
                  setCurrentRestaurantBookings([]);
                else if (activeTab === "previousRestaurant")
                  setPrevRestaurantBookings([]);
              }}
            >
              ✕
            </button>
          </div>
          {activeTab === "currentRestaurant" ? (
            <BookingList
              bookings={currentRestaurantBookings}
              emptyMessage="You have no current restaurant bookings."
            />
          ) : (
            <BookingList
              bookings={prevRestaurantBookings}
              emptyMessage="No previous restaurant bookings found."
            />
          )}
        </div>
      </div>

      {/* Hall Booking Section */}
      {/* <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-xl font-semibold mb-4">Hall Bookings</h2>
        <div className="flex justify-center gap-6 mb-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === "currentHall" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("currentHall")}
          >
            Current Hall Bookings
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
              activeTab === "previousHall" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("previousHall")}
          >
            Previous Hall Bookings
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 min-h-[150px] text-center">
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                if (activeTab === "currentHall") setCurrentHallBooking([]);
                else if (activeTab === "previousHall") setPrevHallBooking([]);
              }}
            >
              ✕
            </button>
          </div>
          {activeTab === "currentHall" ? (
            <BookingList
              bookings={currentHallBooking}
              emptyMessage="You have no current hall bookings."
            />
          ) : (
            <BookingList
              bookings={prevHallBooking}
              emptyMessage="No previous hall bookings found."
            />
          )}
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default UserDetails;