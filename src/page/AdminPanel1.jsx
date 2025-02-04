import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import UserTable from "../component/UserTable";
import { Bell, MoreVertical, Search } from "lucide-react";
import profile from "../assets/profile.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel1 = () => {
  const [activeItem, setActiveItem] = useState("user-management");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users
  const fetchUsers = async (page = 1, keyword = "") => {
    setIsLoading(true);
    try {
      const url = new URL('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/getAllUsers');
      url.searchParams.append('page', page);
      url.searchParams.append('limit', 10);
      if (keyword) url.searchParams.append('keyword', keyword);

      const response = await fetch(url);
      const data = await response.json();
      console.log("data is present here",data)

      if (response.ok) {
        setUsers(data.data.docs);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error loading users");
    } finally {
      setIsLoading(false);
    }
  };

// Modified handleBlockToggle and handleDeleteUser functions
const handleBlockToggle = async (userId) => {
  try {
    const token = localStorage.getItem('token'); // Get auth token
    const response = await fetch(
      `https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/userActiveBlock/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message || "User status updated successfully");
      fetchUsers(currentPage, searchKeyword);
    } else {
      toast.error(data.message || "Failed to update user status");
    }
  } catch (error) {
    console.error("Error toggling user status:", error);
    toast.error("Error updating user status");
  }
};

const handleDeleteUser = async (userId) => {
  try {
    console.log('Attempting to delete user:', userId);
    const token = localStorage.getItem('token');
    console.log('Token:', token ? 'Present' : 'Missing');
    
    const response = await fetch(`https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/deleteUser/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok) {
      toast.success("User deleted successfully");
      fetchUsers(currentPage, searchKeyword);
    } else {
      toast.error(data.message || "Failed to delete user");
    }
  } catch (error) {
    console.error("Delete error details:", error);
    toast.error("Error deleting user");
  }
}

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1, searchKeyword);
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="relative min-h-screen">
      <ToastContainer />
      {/* Rest of your existing background elements */}
      
      <div className="relative flex min-h-screen z-10">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="flex-1">
          <header className="p-4 flex justify-between items-center">
            <div className="flex w-80">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="search"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search users..."
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-[#199FB1] focus:border-[#199FB1]"
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 h-full text-white bg-[#199FB1] rounded-e-lg hover:bg-[#178a99] transition-colors"
                >
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </button>
              </form>
            </div>
            {/* Rest of your header content */}
          </header>

          <main className="p-0">
            <div className="rounded-lg">
              <div className="p-6">
                <h1 className="text-xl mb-6 text-white">List of users</h1>
                <UserTable 
                  users={users}
                  onBlockToggle={handleBlockToggle}
                  onDeleteUser={handleDeleteUser}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel1;