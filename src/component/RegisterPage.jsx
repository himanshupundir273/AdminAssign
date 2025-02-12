import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import free1 from "../assets/free.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("User already exists with this email or phone number");
        }
        throw new Error(data.message || "Registration failed");
      }
  
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await handleRegister({
        fullName: formData.fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
  
      toast.update(loadingToast, {
        render: "Account created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      // Wait for toast to be visible before navigating
      setTimeout(() => {
        navigate('/', { replace: true }); 
      }, 2000);

    } catch (error) {
      toast.update(loadingToast, {
        render: error.message || "Registration failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/back.svg')",
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl p-4 flex items-center justify-between rounded-lg shadow-xl bg-[#A5A5A5]/20 backdrop-blur-[10px]">
          {/* Left side with logo */}
          <div className="w-1/2 flex justify-center items-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full flex items-center justify-center">
                <div className="text-[#E25845]">
                  <img src={free1} alt="Free Shops Logo" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-96 w-px bg-[#E25845]"></div>

          {/* Right side with form */}
          <div className="w-1/2 p-6 font-poppins">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-1">Create New Account</h2>
              <p className="text-[#7F7F7F] text-sm mb-6">
                Welcome to Free shops App controller
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1] text-sm"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1] text-sm"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1] text-sm"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1] text-sm"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1] text-sm"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1] text-sm"
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

                <div className="flex flex-col items-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-40 bg-[#199FB1] text-white py-2.5 px-4 rounded-md hover:bg-[#178a99] transition-colors text-sm font-medium ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Account'}
                  </button>

                  <a
                    href="/"
                    className="text-sm text-[#199FB1] hover:text-[#178a99]"
                  >
                    Already have an account?
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

export default RegisterPage;