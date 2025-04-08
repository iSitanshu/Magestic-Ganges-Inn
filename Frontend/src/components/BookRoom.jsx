import React from 'react';

const BookRoom = () => {
  return (
    <section
      id="booking"
      className="bg-white shadow-xl rounded-xl p-6 max-w-4xl mx-auto mt-[-60px] z-10 relative"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h3 className="text-xl font-bold text-gray-800">Book a Reservation</h3>
        <h3 className="text-sm text-gray-500">Have a Promo Code?</h3>
      </div>

      <form className="flex flex-wrap gap-4 justify-between items-end">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-600">Arrival</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-600">Departure</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-600">Guests</label>
          <input
            type="number"
            min="1"
            className="px-4 py-2 border border-gray-300 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-600">Rooms</label>
          <input
            type="number"
            min="1"
            className="px-4 py-2 border border-gray-300 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition"
          >
            Check
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookRoom;
