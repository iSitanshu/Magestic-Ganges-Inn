import React from 'react'

const BookRoom = () => {
  return (
    <section
        id="booking"
        className="bg-white shadow-2xl rounded-xl p-8 max-w-6xl mx-auto mt-[-80px] z-10 relative"
      >
        <div className="flex justify-between items-center mb-6 flex-wrap">
          <h3 className="text-2xl font-bold text-gray-800">Book a Reservation</h3>
          <h3 className="text-md text-gray-500">Have a Promo Code?</h3>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Arrival</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Departure</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Number of Guests</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Number of Rooms</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition"
            >
              Check Availability
            </button>
          </div>
        </form>
      </section>
  )
}

export default BookRoom