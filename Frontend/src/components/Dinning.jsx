import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const items = [
  {
    title: "Room & Suite",
    hoverText: "Perfect for Stay",
    defaultImg: assets.roombg,
    hoverImg: assets.roombg2,
    route: "/RoomBooking"
  },
  {
    title: "Event Hall",
    hoverText: "Organise Events",
    defaultImg: assets.hallimage1,
    hoverImg: assets.hallbg2,
    route: "/RestaurantBooking"
  },
  {
    title: "Dinning",
    hoverText: "Flavours for All Occasions",
    defaultImg: assets.dinningbg,
    hoverImg: assets.dinningbg2,
    route: "/RestaurantBooking"
  },
  {
    title: "Early Birds",
    hoverText: "20% Off On Our Plans",
    defaultImg: assets.earlybg,
    hoverImg: assets.earlybg2,
    route: "/RoomBooking"
  }
];

const Dinning = () => {
  return (
    <div className="py-22 px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Room, Lawn, Boutique & Dining
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => {
          const CardContent = (
            <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
              {/* Default image */}
              <img
                src={item.defaultImg}
                alt={item.title}
                className="w-full h-64 object-cover transition duration-500 group-hover:opacity-0"
              />

              {/* Overlay title */}
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <h3 className="text-xl text-white font-semibold">{item.title}</h3>
              </div>

              {/* Hover image with text */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <img
                  src={item.hoverImg}
                  alt={`${item.title} hover`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                  <p className="text-black text-xl font-medium">{item.hoverText}</p>
                </div>
              </div>
            </div>
          );

          return item.route ? (
            <NavLink to={item.route} key={index}>
              {CardContent}
            </NavLink>
          ) : (
            <div key={index}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dinning;
 