import React, { useState } from 'react';

const Member = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    payment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Membership Form Submitted!');
  };

  return (
    <div className=" py-22 px-4">
      <h1 className="text-3xl font-bold text-center text-black mb-8">Be Our Member</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-yellow-500"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="userName"
            placeholder="Enter your username"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create password"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="payment"
            placeholder="Payment Method (e.g. UPI, Card)"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Please select a password of at least eight characters, including at least three of the following:
          capital letter, lowercase letter, number, special character.
        </p>
        <button
          type="submit"
          className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-yellow-500 transition"
        >
          Become a Member
        </button>
      </form>
    </div>
  );
};

export default Member;
