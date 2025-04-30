import React from 'react'
import { assets } from '../assets/assets'

const Galary = () => {
  const roomImages = [
    assets.roomimage1, assets.roomimage2, assets.roomimage3, assets.roomimage4
  ]

  const diningImages = [
    assets.dinningbg, assets.menu1, assets.menu2, assets.menu3,
  ]

  const restaurantImages = [
    assets.hallimage1, assets.hallimage2,
    assets.hallbg,
    assets.earlybg
  ]

  const renderSection = (title, images) => (
    <div className="mb-14">
      <h3 className="text-3xl font-semibold text-gray-700 mb-6 border-b-4 border-yellow-400 inline-block">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={img}
              alt={`${title} image ${index + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-16">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Gallery</h2>
      {renderSection("Room", roomImages)}
      {renderSection("Dining", diningImages)}
      {renderSection("Restaurant", restaurantImages)}
    </div>
  )
}

export default Galary
