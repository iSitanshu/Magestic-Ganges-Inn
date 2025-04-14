import React, { useContext, useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import Offers from "../components/Offers";
import Review2 from "../components/Review2";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import UserContext from "../context/User/UserContext";

const amenitiesList = [
  { name: "Buffet", icon: assets.buffet },
  { name: "Debit/Credit Card", icon: assets.credit },
  { name: "Reservation", icon: assets.reservation },
  { name: "Seating", icon: assets.seat },
  { name: "Takeout", icon: assets.takeout },
  { name: "UPI", icon: assets.upi },
  { name: "Free Parking", icon: assets.parking },
  { name: "Waiter Service", icon: assets.waiter },
];

const RestaurantBooking = () => {
  const [toggleAmenities, setToggleAmenities] = useState(false);
  const images = [assets.hallbg, assets.hallimage1, assets.hallimage2];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <Navbar2 title="Dineout" showPhoto={true} bookingLink="/TableBooking" />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-1 text-left">
          Majestic Ganges Inn
        </h1>
        <div className="flex items-center text-left">
          <span className="text-yellow-500 text-xl font-semibold">★ 4.8</span>
          <span className="text-gray-600 text-lg ml-2">(1,234 reviews)</span>
        </div>
        <p className="text-left text-xl text-gray-600 mb-4">
          Taste the Nawabi elegance with our signature vegetarian delights.
        </p>

        <div className="relative w-full h-80 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={images[currentImage]}
            alt="Slideshow"
            className="w-full h-full object-cover transition duration-1000 ease-in-out"
          />
        </div>

        <div className="flex justify-around my-6">
          <NavLink
            to="/TableBooking"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition"
          >
            Book Reservation
          </NavLink>
          <NavLink
            to="/HallBooking"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition"
          >
            Hall Reservation
          </NavLink>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8 text-gray-800">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">At a glance</h2>
            <p className="text-green-600 font-semibold">
              Open until 11:00 PM{" "}
              <span className="text-gray-500 underline cursor-pointer">
                See all hours
              </span>
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <a href="#" className="text-blue-500 hover:underline">
                Website
              </a>
              <a
                href="tel:+915224244857"
                className="text-blue-500 hover:underline"
              >
                +91 522 424 4857
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-600">
              We have been serving the unrivaled and best food in Varanasi till
              date. Located near Nadi, we have earned esteem by serving great
              vegetarian food generously. Having had a wealthy experience, our
              well-trained chefs recreate the Nawabi taste in an aggrandizing
              manner.
            </p>
          </div>

          <div>
            <h2 className="text-md font-semibold mb-2">
              Features{" "}
              {!toggleAmenities && (
                <span
                  onClick={() => setToggleAmenities(true)}
                  className="text-sm text-blue-500 hover:underline cursor-pointer"
                >
                  See all features
                </span>
              )}
            </h2>
            {!toggleAmenities && (
              <div className="space-y-2">
                <p>✔ Digital Payments, Accepts Credit Cards</p>
                <p>✔ Breakfast, Lunch, Dinner</p>
                <p>✔ Buffet, Delivery, Takeout</p>
              </div>
            )}
          </div>

          {/* Amenities modal overlay */}
          {toggleAmenities && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
              <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setToggleAmenities(false)}
                className="absolute top-4 right-5 text-3xl text-gray-500 hover:text-red-500"
              >
                &times;
              </button>

              <h3 className="text-3xl font-bold text-gray-800 mb-6 mt-12 text-center">
                All Amenities
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 pb-4">
                {amenitiesList.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center bg-gray-50 border rounded-lg p-5 shadow-sm hover:shadow-lg transition duration-200"
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-14 h-14 mb-3 opacity-80"
                    />
                    <span className="text-gray-800 font-medium text-sm text-center">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">
              <span>
                <i className="ri-map-pin-line"></i>
              </span>{" "}
              Location
            </h2>
            <p className="text-gray-700">
              7W2G+FPJ, NH 19, Khusipur, Nibiya, Uttar Pradesh 221011
            </p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Hours</h3>
              <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                Suggest an edit
              </span>
            </div>
            <p className="text-green-600 font-semibold mb-2">
              Open until 11:00 PM
            </p>
            <ul className="text-sm space-y-1">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <li
                  key={day}
                  className={day === "Wednesday" ? "font-bold" : ""}
                >
                  {day} <span className="float-right">11:00 am - 11:00 pm</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Offers />

      <Review2 />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Photos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src={assets.hallimage1}
            alt="Hall 1"
            className="rounded-lg shadow-md"
          />
          <img
            src={assets.hallimage2}
            alt="Hall 2"
            className="rounded-lg shadow-md"
          />
          <img
            src={assets.dining}
            alt="Dining"
            className="rounded-lg shadow-md"
          />
          <img
            src={assets.dinningbg}
            alt="Dining BG"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img
            src={assets.menu1}
            alt="Menu 1"
            className="rounded-lg shadow-md"
          />
          <img
            src={assets.menu2}
            alt="Menu 2"
            className="rounded-lg shadow-md"
          />
          <img
            src={assets.menu3}
            alt="Menu 3"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="text-center py-12 bg-yellow-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Food</h2>
        <img src={assets.logo} alt="Food Logo" className="mx-auto h-32" />
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantBooking;
