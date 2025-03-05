// components/Operador/BarraSuperior.jsx
import React, { useState } from "react";
import { Notifications } from "@mui/icons-material";

function BarraSuperior() {
  return (
    <header className="fixed top-0 left-[120px] w-[calc(100%-120px)] h-[122px] bg-white shadow flex justify-between items-center p-4 z-50">
      <h1 className="text-[#6a62dc] text-[40px] font-semibold font-['Inter']">
        Vista Asignar
      </h1>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}

function NotificationBell() {
  return (
    <div className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded-full">
      <div data-svg-wrapper className="mr-2">
        <svg
          width="36"
          height="28"
          viewBox="0 0 36 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 0H4C2.075 0 0.5175 1.575 0.5175 3.5L0.5 24.5C0.5 26.425 2.075 28 4 28H32C33.925 28 35.5 26.425 35.5 24.5V3.5C35.5 1.575 33.925 0 32 0ZM32 24.5H4V7L18 15.75L32 7V24.5ZM18 12.25L4 3.5H32L18 12.25Z"
            fill="#6A62DC"
          />
        </svg>
      </div>
      <Notifications className="text-[#6A62DC]" fontSize="large" />
    </div>
  );
}

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
    <div className="p-2 text-sm text-gray-700">
      <p className="mb-2">Mi Perfil</p>
      <hr />
      <p className="mt-2">Cerrar sesión</p>
    </div>
  );
}

export default BarraSuperior;