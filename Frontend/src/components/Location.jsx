import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import { assets } from '../assets/assets';

const landmarks = [
  {
    name: 'Dhamek Stupa',
    distance: '5.8 Km',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Dhamek_Stupa%2C_Sarnath.jpg/320px-Dhamek_Stupa%2C_Sarnath.jpg',
  },
  {
    name: 'Archaeological Museum',
    distance: '6.1 Km',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Sarnath_Museum.jpg/320px-Sarnath_Museum.jpg',
  },
  {
    name: 'Thai Temple',
    distance: '6.5 Km',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Thai_Temple_Sarnath.jpg/320px-Thai_Temple_Sarnath.jpg',
  },
];

const collapsibleData = {
  'Key Landmarks': landmarks,
  Attractions: landmarks,
  Transport: landmarks,
};

const Location = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full px-6 md:px-20 py-22">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Location</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left - Map */}
        <div className="w-full md:w-[60%] h-[450px] relative rounded-lg overflow-hidden shadow-md">
          <a
            href="https://www.google.com/maps/place/Majestic+Ganges+Inn/@25.2520673,82.9243728,17z"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.map}
              alt="Map"
              className="w-full h-full object-cover filter transition-all duration-300"
            />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all">
              Click to View Map
            </button>
          </a>
        </div>

        {/* Right - Info Sections */}
        <div className="w-full md:w-[40%] flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Explore Nearby</h2>
          {Object.entries(collapsibleData).map(([section, items], index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                onClick={() => toggleSection(section)}
                className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-200 hover:bg-yellow-500 transition"
              >
                <h3 className="text-lg font-medium text-gray-800">{section}</h3>
                <i className={`ri-arrow-${openSection === section ? 'up' : 'down'}-wide-line text-xl`}></i>
              </div>
              {openSection === section && (
                <div className="p-4 space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.distance} away</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
