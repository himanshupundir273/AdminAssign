import React from "react";
import free1 from "../assets/free.svg";
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/back.svg')",
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center ">
        <div className="w-full max-w-5xl p-14 flex items-center justify-center rounded-lg shadow-xl bg-[#A5A5A5]/20 backdrop-blur-[10px]">
          <div className="w-full max-w-xl p-18 rounded-lg bg-white shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24">
                <img
                  src={free1}
                  alt="Free Shops Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="text-center font-poppins">
              <h1 className="text-3xl font-[700] font-poppins  text-gray-900">Welcome</h1>
              <h2 className="text-xl  font-[700] font-poppins text-[#FF8553]">
                to the Free Shops App Admin Panel
              </h2>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#7F7F7F] text-sm ">
                Manage and monitor all aspects of your app seamlessly from one
                place. Use the tools below to get started.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#199FB1] text-white px-4 py-1 rounded-md hover:bg-[#178a99] transition-colors font-[700] text-sm "
              >
                Get Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
