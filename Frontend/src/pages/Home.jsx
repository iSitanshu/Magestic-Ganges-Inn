import React from 'react';
import { assets } from '../assets/assets.js';
import 'remixicon/fonts/remixicon.css';
import Navbar from '../components/Navbar.jsx';
import BookRoom from '../components/BookRoom.jsx';
import Amenities from '../components/Amenities.jsx';
import Dinning from '../components/Dinning.jsx';
import Offers from '../components/Offers.jsx';
import Location from '../components/Location.jsx';
import Member from '../components/Member.jsx';
import Review from '../components/Review.jsx';
import Footer from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const changepage = () => {
    navigate('/RoomBooking')
  }

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      {/* Header */}
      <header id='homesection'
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
              className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-gray-900 px-6 py-3 rounded-full font-semibold transition"
              onClick={()=>changepage()}
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* Booking Form */}
      <BookRoom />


      <Amenities />

      <div id="roomsection">
        <Dinning />
      </div>

      <div id="offersSection">
        <Offers />
      </div>

      <div id="locationsection">
        <Location />
      </div>

      <div id="membersection">
        <Member />
      </div>

      <Review />

      <Footer />

    </div>
  );
};

export default Home;
