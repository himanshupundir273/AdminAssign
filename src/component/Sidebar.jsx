import React, { useState } from 'react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('user-management');
  
  const menuItems = [
    { id: 'logo', label: 'Logo', isTitle: true },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'user-management', label: 'User Management' },
    { id: 'rating-review', label: 'Rating and Review' },
    { id: 'settings', label: 'Settings' },
    { id: 'history', label: 'History' },
    { id: 'all-bookings', label: 'All Bookings' },
    { id: 'push-notification', label: 'Push Notification' },
    { id: 'transaction-list', label: 'Transaction List' },
    { id: 'google-analytics', label: 'Google Analytics' },
    { id: 'multi-currency', label: 'Multi-Currency' },
    { id: 'category', label: 'Category' },
    { id: 'live-chat-history', label: 'Live Chat History' },
    { id: 'package-plan', label: 'Package Plan' },
    { id: 'referral-history', label: 'Referral History' },
    { id: 'google-map', label: 'Google Map' },
  ];

  return (
    <div className="relative">
      <div 
        className="absolute top-0 right-0 w-32 h-32 bg-[#FF8553] rounded-bl-full"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
        }}
      />

      <div className="w-64 min-h-screen bg-white shadow-lg relative z-10">
        <div className="p-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full text-left py-3 px-4 mb-1 transition-colors ${
                item.isTitle 
                  ? 'text-[#199FB1] font-semibold text-xl mb-4' 
                  : activeItem === item.id
                    ? 'bg-[#199FB1] text-white rounded-xl'
                    : 'text-[#199FB1] hover:bg-gray-50 rounded-xl'
              }`}
              onClick={() => !item.isTitle && setActiveItem(item.id)}
              disabled={item.isTitle}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;