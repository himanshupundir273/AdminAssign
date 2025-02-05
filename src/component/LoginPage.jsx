import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import free1 from "../assets/free.svg"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingId = toast.loading("Logging in...");
    
    try {
      const response = await handleLogin(formData);
      
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userData', JSON.stringify(response.data));
        
        toast.update(loadingId, {
          render: "Login successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.update(loadingId, {
        render: error.message || "Login failed",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/back.svg')",
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl p-16 flex items-center justify-between rounded-lg shadow-xl bg-[#A5A5A5]/20 backdrop-blur-[10px]">
          <div className="w-1/2 flex justify-center items-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-rose-100 flex items-center justify-center">
                <div className="text-rose-500">
                  <img src={free1} alt="Free Shops Logo" />
                </div>
              </div>
              <div className="absolute -bottom-4 w-full text-center">
                <p className="text-rose-500 font-semibold">FREE SHOPS</p>
              </div>
            </div>
          </div>

          <div className="h-110 w-px bg-[#E25845]"></div>

          <div className="w-1/2 p-8 font-poppins">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl mb-1 font-[700]">Log in</h2>
              <p className="text-[#7F7F7F] font-[400] text-xs mb-6">
                Welcome to Free shops App controller
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5" />
                      ) : (
                        <EyeOffIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="text-center mt-1">
                    <a href="#" className="text-sm text-[#7F7F7F] hover:text-gray-700">
                      Forgot Password
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-20 bg-[#199FB1] text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors"
                  >
                    Log in
                  </button>
                </div>

                <div className="text-center">
                  <a
                    href="/register"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Create New Account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;