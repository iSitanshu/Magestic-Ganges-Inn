import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import 'remixicon/fonts/remixicon.css';

const amenitiesList = [
  { name: 'CCTV', icon: assets.cctv },
  { name: 'Air Conditioning', icon: assets.ac },
  { name: 'Clean Rooms', icon: assets.clear },
  { name: 'Fire Safety', icon: assets.fire },
  { name: 'Electric Kettle', icon: assets.ketle },
  { name: 'Medical Kit', icon: assets.med },
  { name: 'In-Room Phone', icon: assets.phone },
  { name: 'Free Parking', icon: assets.parking },
  { name: 'Waiter Service', icon: assets.waiter },
  { name: 'High-Speed WiFi', icon: assets.wifi }
];

const Amenities = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="text-center py-56 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-5xl font-extrabold text-yellow-500 mb-3 tracking-wide">
        Majestic Ganges Inn
      </h1>
      <h2 className="text-2xl text-gray-600 font-medium mb-10">
        Rooms · Boutique · Lawn · Restaurant
      </h2>

      {/* Amenity Icons */}
      <div className="flex flex-wrap justify-center gap-8">
        {amenitiesList.map((item, index) => (
          <div
            key={index}
            className="w-15 h-20 relative group cursor-pointer transition-all hover:scale-110"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="absolute bottom-[-1.75rem] left-1/2 transform -translate-x-1/2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-10 px-8 py-3 bg-black hover:bg-yellow-500 text-white font-semibold rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
      >
        View All Amenities <i className="ri-arrow-right-wide-line text-lg"></i>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 text-3xl text-gray-500 hover:text-red-500"
            >
              &times;
            </button>

            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              All Amenities
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {amenitiesList.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center bg-gray-50 border rounded-lg p-5 shadow-sm hover:shadow-lg transition duration-200"
                >
                  <img src={item.icon} alt={item.name} className="w-14 h-14 mb-3 opacity-80" />
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
  );
};

export default Amenities;
