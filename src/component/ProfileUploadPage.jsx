import React, { useState } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileUploadPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    profileImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        profileImage: file
      }));
    }
  };

  const handleRegistration = async (userData) => {
    try {
      const response = await fetch('https://mamun-reza-freeshops-backend.vercel.app/api/v1/user/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingId = toast.loading("Creating your profile...");
    
    try {
      const response = await handleRegistration({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });

      if (response) {
        toast.update(loadingId, {
          render: "Profile created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        setTimeout(() => {
          navigate('/admin', { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error("Profile creation failed:", error);
      toast.update(loadingId, {
        render: error.message || "Profile creation failed",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  const handleSkip = () => {
    navigate('/admin');
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
        <div className="w-full max-w-5xl p-8 flex items-center justify-center rounded-lg shadow-xl bg-[#A5A5A5]/20 backdrop-blur-[10px]">
          <div className="w-full max-w-xl p-4 rounded-lg bg-white shadow-lg">
            <div className="flex justify-end">
              <button 
                onClick={handleSkip}
                className="text-[#199FB1] text-sm hover:text-[#178a99]"
              >
                Skip
              </button>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="profileImage" className="cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    {formData.profileImage ? (
                      <img 
                        src={URL.createObjectURL(formData.profileImage)} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[#199FB1] text-sm font-medium">Upload Profile Pictures</h2>
            </div>

            <form className="space-y-2 px-16" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs text-black mb-1">Your Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="XYZ"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-black mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="xyz@gmail.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-black mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="09876554324"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1]"
                />
              </div>

              <div>
                <label className="block text-xs text-black mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#199FB1]"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 
                      <EyeOff className="w-5 h-5" /> : 
                      <Eye className="w-5 h-5" />
                    }
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-center items-center">
                <button
                  type="submit"
                  className="w-26 bg-[#199FB1] text-white py-1 px-4 rounded-md hover:bg-[#178a99] transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUploadPage;