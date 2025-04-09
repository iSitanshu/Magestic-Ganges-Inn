// Review.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Raj Kumar',
    time: '2 weeks ago',
    text: 'Best restaurants and hotel khushipur amazing and good food good service',
    rating: 5,
  },
  {
    name: 'Aditya Kumar',
    time: '2 weeks ago',
    text: 'Had a great dining experience, marriage lawn is spacious with staff showing utmost professionalism.',
    rating: 5,
  },
  {
    name: 'Ashish Gaur',
    time: '2 weeks ago',
    text: 'Best restaurant and hotel khushipur with awesome and food . Afghani Chicken good boy staff behaviour was nice ❤️',
    rating: 5,
  },
];

const ratingStats = [
  { label: 'Excellent', percent: 69 },
  { label: 'Very Good', percent: 17 },
  { label: 'Average', percent: 7 },
  { label: 'Poor', percent: 4 },
  { label: 'Bad', percent: 4 },
];

const Review2 = () => {
  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Customer Reviews</h2>

        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-yellow-600 text-white text-2xl font-bold px-4 py-2 rounded-lg">4.5</div>
            <div>
              <p className="text-lg font-semibold text-gray-800">Excellent</p>
              <p className="text-sm text-gray-500">1549 Ratings, 833 Reviews</p>
            </div>
          </div>
          <div>
            {ratingStats.map((item) => (
              <div key={item.label} className="flex justify-between items-center mb-2">
                <span className="w-24 text-gray-700">{item.label}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
                  <div className="h-2 bg-yellow-500 rounded" style={{ width: `${item.percent}%` }}></div>
                </div>
                <span className="text-gray-600 text-sm">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-800">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.time}</p>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 ${i < review.rating ? 'opacity-100' : 'opacity-30'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review2;
