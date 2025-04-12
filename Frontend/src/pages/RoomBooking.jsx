import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import LoginPopup from "../components/LoginPopup.jsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import UserContext from "../context/User/UserContext.js";
import PopupContext from "../context/Popup/PopupContext.js";
import Navbar2 from "../components/Navbar2.jsx";
import { asyncHandler } from "../../../Backend/src/utils/asyncHandler.js";

const RoomBooking = () => {
  const [step, setStep] = useState(1); // Booking steps
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [luggageDays, setLuggageDays] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(2);
  const [promoCode, setPromoCode] = useState("");
  const { showLogin, setShowLogin } = useContext(PopupContext);
  const { user, setUser } = useContext(UserContext);
  const [showRoomAvailability, setShowRoomAvailability] = useState(false);
  const [roomnumber, setRoomNumber] = useState(null);
  
  const [type1, setType1] = useState(null)
  const [type2, setType2] = useState(null)
  const [type3, setType3] = useState(null)
  const [type4, setType4] = useState(null)
  
  const [verifyUser, setVerifyUser] = useState({
    email: "",
    password: "",
    phoneno: "",
  });

  // Update the handleverifyuser function
  const handleverifyuser = (e) => {
    const { name, value } = e.target;
    setVerifyUser((prev) => ({ ...prev, [name]: value }));
  };

  const dataincurrentRoom = async (index) => {
    if (index === 1) {
      setBookingDetails((prev) => ({
        ...prev,
        roomId: type1?.[0]?._id
      }));
    } else if (index === 2) {
      setBookingDetails((prev) => ({
        ...prev,
        roomId: type2?.[0]?._id
      }));
    } else if (index === 3) {
      setBookingDetails((prev) => ({
        ...prev,
        roomId: type3?.[0]?._id
      }));
    } else if (index === 4) {
      setBookingDetails((prev) => ({
        ...prev,
        roomId: type4?.[0]?._id
      }));
    }
  };

  const [bookingDetails, setBookingDetails] = useState({
    userId: "",
    roomId: "",
    fromDate: "",
    toDate: "",
    guest: "",
    totalPrice: "",
  });

  const handleRequestRoom = () => {
    setShowRoomAvailability(true);
    setBookingDetails({
      ...bookingDetails,
      fromDate: arrivalDate,
      toDate: departureDate,
      guest: numAdults,
    });
  };

  const particularRoom = [
    { "id": 101, "roomId": "67f795f354d898464a58ec23" },
    { "id": 102, "roomId": "67f7968654d898464a58ec24" },
    { "id": 103, "roomId": "67f796f154d898464a58ec25" },
    { "id": 104, "roomId": "67f7970854d898464a58ec26" },
    { "id": 105, "roomId": "67f7978554d898464a58ec27" },
    { "id": 106, "roomId": "67f797aa54d898464a58ec28" },
    { "id": 107, "roomId": "67f797d754d898464a58ec29" },
    { "id": 108, "roomId": "67f797e754d898464a58ec2a" },
    { "id": 109, "roomId": "67f7980a54d898464a58ec2b" },
    { "id": 110, "roomId": "67f7981a54d898464a58ec2c" },
    { "id": 111, "roomId": "67f7a94fdb0ae61806523f84" },
]


  const showAvailability = async () => {
    try {
      // Step 2: POST requests for specific room availability
      const type1Ids = [101, 102, 103];
      const type2Ids = [104];
      const type3Ids = [105, 106, 107, 108, 109];
      const type4Ids = [110];
  
      const tempType1 = [];
      const tempType2 = [];
      const tempType3 = [];
      const tempType4 = [];
  
      for (let room of particularRoom) {
        const response = await fetch('http://localhost:8000/api/v1/rooms/availableparticularroom', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId: room.roomId,
            fromDate: arrivalDate,
            toDate: departureDate
          })
        });
  
        if (response.ok) {
          const data = await response.json();
          const roomData = data.data.room;
  
          if (type1Ids.includes(room.id)) {
            tempType1.push(roomData);
          } else if (type2Ids.includes(room.id)) {
            tempType2.push(roomData);
          } else if (type3Ids.includes(room.id)) {
            tempType3.push(roomData);
          } else if (type4Ids.includes(room.id)) {
            tempType4.push(roomData);
          }
        } else if (response.status === 400) {
          console.log(`Room ID ${room.id} is unavailable`);
        } else {
          const errorData = await response.json();
          console.log(`Error for room ${room.id}:`, errorData);
        }
      }
  
      setType1(tempType1);
      setType2(tempType2);
      setType3(tempType3);
      setType4(tempType4);
    } catch (error) {
      console.log("Fetch failed (POST requests):", error);
    }
  }

  const navigate = useNavigate();

  const rooms = [
    {
      name: "Suite with Balcony",
      type: "Triple Occupancy",
      bed: "1 Double + 1 Single Bed",
      occupancy: 3,
      price: 3500,
      features: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Balcony",
        "Breakfast and Dinner included",
        "Non-Refundable",
      ],
      image: assets.roomimage1,
      available: true,
      count: type1==null?0:type1.length,
    },
    {
      name: "Double Room with Balcony",
      type: "Double Occupancy",
      bed: "1 Double Bed",
      occupancy: 2,
      price: 3500,
      features: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Balcony",
        "Breakfast and Dinner included",
        "Non-Refundable",
      ],
      image: assets.roomimage2,
      available: true,
      count: type2==null?0:type2.length,
    },
    {
      name: "Standard Double Room",
      type: "Double Occupancy",
      bed: "1 Double Bed",
      occupancy: 2,
      price: 2500,
      features: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Breakfast and Dinner included",
        "Non-Refundable",
      ],
      image: assets.roomimage3,
      available: true,
      count: type3==null?0:type3.length,
    },
    {
      name: "Standard Triple Room",
      type: "Triple Occupancy",
      bed: "1 Double + 1 Single Bed",
      occupancy: 3,
      price: 2500,
      features: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Breakfast and Dinner included",
        "Non-Refundable",
      ],
      image: assets.roomimage4,
      available: true,
      count: type4==null?0:type4.length,
    },
  ];

  const toHome = () => {
    navigate("/");
  };
  const toDinning = () => {
    navigate("/RestaurantBooking");
  };
  const toHall = () => {
    navigate("/HallBooking");
  };

  const handleRequestRoomClick = async () => {
    if (!arrivalDate || !departureDate) return;

    handleRequestRoom();
    await showAvailability();
  };

  const calculateNights = () => {
    const today = new Date();
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);

    if (arrival < today) {
      alert("Arrival date cannot be before today.");
      return 0;
    }

    if (arrival >= departure) {
      alert("Departure date must be after the arrival date.");
      return 0;
    }

    const diffTime = departure - arrival;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const nights = calculateNights();
  const roomPrice = selectedRoom ? selectedRoom.price * nights : 0;
  const tax = nights * 15;
  const luggageCharge = luggageDays * 10;
  const totalCost = roomPrice + tax + luggageCharge;

  const handleConfirmation = () => {
    if (!user || !user.user) {
      setShowLogin(true);
      return;
    }
    setBookingDetails({
      ...bookingDetails,
      userId: user.user._id,
      totalPrice: totalCost
    });
    
  }

  const handlePayment = async () => {  
    const verifiedUser = await verification();
    console.log(JSON.stringify(myObject, null, 2));
      console.log(bookingDetails)
      await insertinroombooking();
      // navigate("/UserDetails");
    }
  

  const insertinroombooking = async (req, res) => {
    console.log(bookingDetails)
    try {
      const response = await fetch('http://localhost:8000/api/v1/rooms/newBooking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingDetails })
      });

      if (response.ok) {
      const data = await response.json();
      console.log("Booking successful:");
      alert("Booking confirmed successfully!");
      } else if (response.status === 400) {
      const errorData = await response.json();
      console.error("Booking failed:", errorData);
      alert("Booking failed. Please check your details and try again.");
      } else {
      const errorData = await response.json();
      console.error("Unexpected error:", errorData);
      alert("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("Unable to process your booking at the moment. Please try again later.");
    }
  }

  const verification = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/rooms/verifyuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifyUser),
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(data.data); // Set the user first
        return data.data; // Return user data to be used immediately
      } else if (response.status === 404) {
        alert("Invalid User Credentials");
        return null;
      } else {
        const errorData = await response.json();
        console.error("Verification failed:", errorData);
        return null;
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      return null;
    }
  };
  

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* Navbar */}
      <Navbar2 />

      {/* Step 1: Booking Form */}
      {step === 1 && (
        <>
          <section className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full space-y-6">
              <h2 className="text-xl font-bold text-gray-800">
                Book Your Stay
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Dates */}
                <div>
                  <label className="text-sm text-gray-600">Arrival</label>
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    min={todayStr}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Departure</label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    min={arrivalDate || todayStr}
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Occupancy */}
                <div>
                  <label className="text-sm text-gray-600">
                    Number of Rooms
                  </label>
                  <select
                    value={numRooms}
                    onChange={(e) => setNumRooms(parseInt(e.target.value))}
                    className="w-full border p-2 rounded"
                  >
                    {[1].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Adults</label>
                  <select
                    value={numAdults}
                    onChange={(e) => setNumAdults(parseInt(e.target.value))}
                    className="w-full border p-2 rounded"
                  >
                    {[1, 2, 3].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Promo Code */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600">Promo Code</label>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Booking Summary */}
                <div className="md:col-span-2 text-right">
                  <p className="font-bold text-gray-700 text-lg">
                    Your booking summary:
                    <span className="text-yellow-600 ml-2">€ 0.00</span>
                  </p>
                </div>
              </div>

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await handleRequestRoomClick();
                  const target = document.querySelector("#selectyourroom");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                disabled={!arrivalDate || !departureDate}
                className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 transition disabled:opacity-50"
              >
                Request Room
              </button>
            </div>
          </section>
          <>
            {showRoomAvailability && (
              <section id="selectyourroom" className="mt-24 p-6 space-y-8">
                <h2 className="text-2xl font-bold text-center">
                  Select Your Room
                </h2>
                {rooms.map((room, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg border"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full md:w-1/3 rounded-xl object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-semibold">{room.name}</h3>
                        <p className="text-sm text-gray-600">
                          {room.type} • {room.bed}
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {room.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                        <p className="text-xl font-bold text-gray-800">
                          $ {room.price} / night
                        </p>
                      </div>
                      <div className="flex flex-col justify-between">
                        {!room.available ? (
                          <p className="text-red-600 text-sm font-medium">
                            Not Available
                            <br />
                            <span className="underline cursor-pointer">
                              Check Calendar
                            </span>
                          </p>
                        ) : room.count === 0 ? (
                          <p className="text-red-600 text-sm font-medium">
                            Room is currently not available
                          </p>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setSelectedRoom(room);
                                setStep(2);
                                dataincurrentRoom(index);
                              }}
                              className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
                            >
                              Book Now
                            </button>
                            {showRoomAvailability && (
                              <p className="text-gray-600 text-sm mt-1">
                                Available Count: {room.count}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        </>
      )}

      {/* Step 3: Booking Summary */}
      {step === 2 && selectedRoom && (
        <section className="mt-24 p-6 max-w-4xl mx-auto space-y-8 bg-white rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800">Booking Summary</h2>
          {/* Room & Stay Details */}
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex justify-between">
              <span className="font-medium">Room:</span>
              <span className="font-semibold">{selectedRoom.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Arrival:</span>
              <span className="font-semibold">
                {new Date(arrivalDate).toDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Departure:</span>
              <span className="font-semibold">
                {new Date(departureDate).toDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Nights:</span>
              <span className="font-semibold">{nights}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Base Price:</span>
              <span className="font-semibold text-green-700">₹{roomPrice}</span>
            </div>
          </div>
          {/* Luggage Storage */}
          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-300">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Luggage Storage Service
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              We offer safe luggage storage after your reservation. ₹10 per day.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">No. of Days:</span>
              <button
                onClick={() => setLuggageDays(Math.max(0, luggageDays - 1))}
                className="w-8 h-8 text-lg bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                −
              </button>
              <span className="font-semibold text-lg">{luggageDays}</span>
              <button
                onClick={() => setLuggageDays(luggageDays + 1)}
                className="w-8 h-8 text-lg bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
              <span className="ml-auto text-gray-800 font-medium">
                Charge:{" "}
                <span className="text-yellow-700 font-bold">
                  ₹{luggageCharge}
                </span>
              </span>
            </div>
          </div>
          {/* Booking Fee */}
          <div className="flex justify-between items-center text-sm text-gray-700">
            Including all the Booking Charge:
            <div className="flex justify-between">
              <span className="font-medium">Tax (₹15/night):</span>
              <span className="font-semibold text-yellow-700">₹{tax}</span>
            </div>
          </div>
          {/* Total Price */}
          <div className="text-right text-2xl font-bold text-black mt-4">
            Total Cost: ₹{totalCost}
          </div>
          {/* User Info */}
          Enter your Required Details
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              onChange={handleverifyuser}
              placeholder="Enter your registered Email"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              name="password"
              onChange={handleverifyuser}
              placeholder="Enter your password"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              name="phoneno"
              onChange={handleverifyuser}
              placeholder="Enter your Phone No"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
            className="bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
            disabled={
              !verifyUser.email || !verifyUser.password || !verifyUser.phoneno
            }
            onClick={handleConfirmation}
            >Confirm Details</button>
          </div>
          <span className="text-red-500">
            *Make sure login/signup before making payment
          </span>
          <button
            onClick={handlePayment}
            disabled={
              !verifyUser.email || !verifyUser.password || !verifyUser.phoneno
            }
            className="mt-6 w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
          >
            Make Payment
          </button>
        </section>
      )}

      <Footer />
    </>
  );
};

export default RoomBooking;
