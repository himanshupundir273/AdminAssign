import React, { useState, useRef, useEffect } from "react";
import { Bell, MoreVertical, Search } from "lucide-react";

// Action Menu Component
const ActionMenu = ({ isOpen, onClose, onViewProfile, onDeleteUser }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-50 py-2">
      <button
        onClick={onViewProfile}
        className="w-full text-left px-4 py-2 text-[#199FB1] hover:bg-gray-50 text-sm"
      >
        View Profile
      </button>
      <button
        onClick={onDeleteUser} // Direct call
        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 text-sm"
      >
        Delete User
      </button>
    </div>
  );
};
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// User Table Component
const UserTable = ({
  users,
  onBlockToggle,
  onDeleteUser,
  currentPage,
  setCurrentPage,
  isLoading,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewProfile = (userId) => {
    console.log("View profile for user:", userId);
    setActiveMenu(null);
  };

  const handleDeleteUser = (userId) => {
    onDeleteUser(userId); // Call the prop function directly
    setActiveMenu(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-end items-center mb-4">
        <div className="relative w-150">
          <input
            type="text"
            placeholder="Search user by their name"
            className="w-full px-4 py-2 border rounded-md pr-10"
          />
          <button className="absolute right-2 top-1 bg-[#199FB1] text-white px-4 py-1 rounded">
            Search
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="w-8 p-2">
              <input type="checkbox" />
            </th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone Number</th>
            <th className="p-2 text-left">User Type</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-3 text-left">Ratings</th>

            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <input type="checkbox" />
              </td>
              <td className="p-2">
                <div>
                  <div>{user.email}</div>
                  <div className="text-xs text-gray-400">{user.userType}</div>
                </div>
              </td>
              <td className="p-2">{user.phone}</td>
              <td className="p-2">{user.userType}</td>
              <td className="p-2">
                <button
                  className={`px-4 py-1 rounded ${
                    user.isBlocked
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={() => onBlockToggle(user._id)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
              <td className="p-3">
                <StarRating rating={user.rating} />
              </td>
              <td className="p-2 relative" ref={menuRef}>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    setActiveMenu(activeMenu === user._id ? null : user._id)
                  }
                >
                  <MoreVertical size={20} />
                </button>
                <ActionMenu
                  isOpen={activeMenu === user._id}
                  onClose={() => setActiveMenu(null)}
                  onViewProfile={() => handleViewProfile(user._id)}
                  onDeleteUser={() => {
                    onDeleteUser(user._id);
                    setActiveMenu(null);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <button className="text-gray-500">Delete</button>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Displaying page</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
