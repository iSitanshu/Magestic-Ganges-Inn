import React from 'react';
import { assets } from '../assets/assets.js';
import 'remixicon/fonts/remixicon.css';
import Navbar from '../components/Navbar.jsx';
import BookRoom from '../components/BookRoom.jsx';
import Amenities from '../components/Amenities.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <div className="absolute inset-0 bg-opacity-30"></div>
      <header
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.landingpage})` }}
      >
        <div className="absolute inset-0 bg-opacity-60 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Hero Text */}
          <div className="flex-grow flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury Stay, Unforgettable Experience</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Book your dream vacation with us. Relax, unwind, and indulge in unmatched comfort and elegance.
            </p>
            <a
              href="#booking"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-full font-semibold transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* Booking Form */}
      <BookRoom />

      <Amenities />

      {/* Optional Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm py-6">
        © 2025 YourHotel. All rights reserved.
      </footer>


    </div>
  );
};

export default Home;
