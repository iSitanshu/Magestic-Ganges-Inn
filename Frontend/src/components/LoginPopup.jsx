import React, { useState } from 'react';
import { assets } from '../assets/assets.js';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Sign Up');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 z-50">
      <form className="bg-white w-[90%] sm:w-[400px] p-6 rounded-2xl shadow-xl relative">
        {/* Title and Close */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{currState}</h2>
          <img
            src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-cross-icon-png-image_925896.jpg"
            alt="Close"
            onClick={() => setShowLogin(false)}
            className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 mb-4">
          {currState === 'Login' ? null : (
            <input
              type="text"
              placeholder="Your name"
              required
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            required
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter the Password"
            required
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300"
        >
          {currState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Terms and Conditions */}
        <div className="flex items-start mt-4 gap-2 text-sm text-gray-600">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* Switch Auth Mode */}
        <p className="mt-4 text-sm text-center text-gray-700">
          {currState === 'Login' ? (
            <>
              Create a new account?{' '}
              <span
                onClick={() => setCurrState('Sign Up')}
                className="text-yellow-500 font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setCurrState('Login')}
                className="text-yellow-500 font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
