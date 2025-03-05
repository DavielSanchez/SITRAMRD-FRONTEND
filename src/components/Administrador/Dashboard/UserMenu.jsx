import React, { useState } from 'react';

function UserMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#6A62DC] focus:outline-none"
      >
        <img
          src="https://placehold.co/45x45"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#6A62DC] rounded-lg shadow-lg z-20">
          <UserCard />
        </div>
      )}
    </div>
  );
}

function UserCard() {
  return (
    <div className="p-4">
      <div className="text-[#2c0372] text-lg font-normal">UserName</div>
      <div className="text-[#6A62DC] text-sm">UserEmail</div>
      <div className="mt-2 text-[#6A62DC] text-base">Mi cuenta</div>
    </div>
  );
}

export default UserMenu;
