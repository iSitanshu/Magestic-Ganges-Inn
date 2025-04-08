import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const offers = [
  {
    title: "Hotel Offer",
    priceTag: "Book 2+ Rooms",
    shortInfo: "Tea/Coffee Complimentary",
    hoverInfo: "Enjoy complimentary tea or coffee when you book more than 2 rooms.",
    badge: "HOTEL DEAL",
    image: assets.roomimage1,
    type: 'hotel'
  },
  {
    title: "Restaurant Offer",
    priceTag: "Up to 15% Off",
    shortInfo: "Students Special",
    hoverInfo: "BHU / SMS / SHEPA students get 15% off. Others: 10% off. *ID card mandatory.",
    badge: "STUDENT EXCLUSIVE",
    image: assets.foodoffer,
    type: 'restaurant'
  }
];

const Offers = () => {
  const navigate = useNavigate();

  const handleBooking = (type) => {
    if (type === 'hotel') {
      navigate('/RoomBooking');
    } else if (type === 'restaurant') {
      navigate('/RestaurantBooking');
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-20 lg:px-24 py-22">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Exclusive Offers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {offers.map((offer, index) => (
          <div key={index} className="flex flex-col items-stretch">
            {/* Card */}
            <div className="group relative bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex-1">
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Offer Details */}
              <div className="p-5 relative z-10">
                <h2 className="text-lg font-bold text-gray-800">{offer.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{offer.shortInfo}</p>
                <p className="text-sm font-semibold mt-2 text-yellow-500">{offer.priceTag}</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between z-20">
                <div>
                  <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-3">
                    {offer.badge}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {offer.hoverInfo}
                  </p>
                </div>
                <div className="mt-4 text-xs text-gray-400 text-right italic">
                  *T&C Apply
                </div>
              </div>
            </div>

            {/* Button - always visible below the card */}
            <div className="mt-4">
            <button
                onClick={() => handleBooking(offer.type)}
                className="mx-auto block w-fit px-6 py-2 bg-black hover:bg-yellow-500 text-white text-sm font-medium rounded-full transition-all duration-300 cursor-pointer"
            >
                Book Now
            </button>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
