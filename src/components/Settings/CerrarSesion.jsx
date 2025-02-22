import React from "react";
import { useNavigate } from "react-router-dom";

export default function CerrarSesion({ onClose, theme }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center backdrop-blur-md ${
        theme === "dark" ? "bg-black/50" : "bg-black/30"
      } z-50 min-h-screen px-4`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md p-6 rounded-lg border-2 shadow-xl ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-white border-[#ff5353]"
            : "bg-white text-black border-[#6a62dc]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-lg font-semibold mb-4 text-center ${
            theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
          }`}
        >
          Cerrar Sesión
        </h2>
        <p className="text-center mb-4">
          ¿Seguro que deseas cerrar sesión?
        </p>
        <div className="flex justify-center gap-2">
          <button
            className={`px-4 py-2 rounded text-white ${
              theme === "dark" ? "bg-[#ff5353]" : "bg-red-500"
            }`}
            onClick={onClose}
          >
            No
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${
              theme === "dark" ? "bg-[#ff5353]" : "bg-[#6a62dc]"
            }`}
            onClick={handleConfirm}
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}
