import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import { Bell, MoreVertical, Search } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel1 = () => {
  const [activeItem, setActiveItem] = useState("user-management");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  const handleBlockToggle = async (userId) => {
    try {
      const token = localStorage.getItem('token');
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
      toast.error("Error updating user status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/deleteUser/${userId}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          toast.success("User deleted successfully");
          fetchUsers(currentPage, searchKeyword);
        } else {
          toast.error("Failed to delete user");
        }
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
    setActiveDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1, searchKeyword);
  };
  const handleViewProfile = (userId) => {
    console.log("Viewing profile for user:", userId);
    setActiveDropdown(null);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const renderPagination = () => {
    return (
      <div className="flex items-center justify-end mt-4 gap-2">
        <span className="text-sm text-gray-600">Displaying page</span>
        <button className="px-3 py-1 bg-gray-200 rounded">First</button>
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button className="px-3 py-1 bg-gray-200 rounded">Last</button>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-orange-400 to-white">
      <ToastContainer />
      
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">List of users</h1>
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search user by their name"
                  className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">User Deal</th>
                  <th className="px-4 py-2 text-left">Block/Unblock</th>
                  <th className="px-4 py-2 text-left">Ratings</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || '/default-avatar.png'}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{user.fullName
                          }</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-red-500">{user.soldItems || 0} Sold</div>
                        <div className="text-green-500">{user.boughtItems || 0} Bought</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleBlockToggle(user._id)}
                        className={`px-4 py-1 rounded ${
                          user.isBlocked
                            ? 'bg-red-500 text-white'
                            : 'bg-red-100 text-red-500'
                        }`}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-xl ${
                              star <= (user.ratings || 0)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === user._id ? null : user._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {activeDropdown === user._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewProfile(user._id)}
                              className="block w-full text-left px-4 py-2 text-sm text-teal-600 hover:bg-gray-100"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-500">
              Showing {users.length} of 50 total users
            </div>
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel1;