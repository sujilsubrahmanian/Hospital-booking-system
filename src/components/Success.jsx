

import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 px-4">
      {/* Success Icon */}
      <div className="bg-white p-6 rounded-full shadow-lg animate-bounce">
        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl md:text-4xl text-green-700 font-extrabold mt-6 text-center animate-fade-in">
        Your Appointment is Successful!
      </h1>
      <p className="text-gray-600 text-lg mt-2 text-center">
        You will receive a confirmation message on the day before appointment. Please ensure your confirmation by clicking "YES".
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Link to="/">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-bold hover:bg-green-700 transition-transform transform hover:scale-105">
            Back To Home
          </button>
        </Link>

        <Link to="/user/profile">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-bold hover:bg-blue-700 transition-transform transform hover:scale-105">
            Booking Status
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
