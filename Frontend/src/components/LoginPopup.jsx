import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import UserContext from '../context/User/UserContext.js';
import PopupContext from '../context/Popup/PopupContext.js';

const LoginPopup = () => {
  const { setShowLogin } = useContext(PopupContext)
  const { user, setUser } = useContext(UserContext);
  const [currState, setCurrState] = useState('Sign Up');
  const [userregister, setUserRegister] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserRegister({ ...userregister, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        currState === 'Sign Up'
          ? 'https://magestic-ganges-inn-backend.onrender.com/api/v1/users/register'
          : 'https://magestic-ganges-inn-backend.onrender.com/api/v1/users/login';


      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userregister),
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        setUser(data.data); 
        console.log(data.data)
        setShowLogin(false);
      } else if (response.status === 409) {
        alert('User already exists!');
      } else {
        const errorData = await response.json();
        console.error(`${currState} failed:`, errorData);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
      alert('User do not exits!')
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 z-50">
      <form
        className="bg-white w-[90%] sm:w-[400px] p-6 rounded-2xl shadow-xl relative"
        onSubmit={handleSubmit}
      >
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
          {currState === 'Sign Up' && (
            <input
              type="text"
              name="username"
              placeholder="Your name"
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter the Password"
            onChange={handleChange}
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
