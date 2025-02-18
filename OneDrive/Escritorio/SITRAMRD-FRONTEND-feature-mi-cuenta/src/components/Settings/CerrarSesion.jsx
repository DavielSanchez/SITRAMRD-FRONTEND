import React from "react";
import { useNavigate } from "react-router-dom";

export default function CerrarSesion({ onClose }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/Auth");
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black/30 z-50 min-h-screen px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white p-6 rounded-lg border-2 border-[#6a62dc] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-[#6a62dc] mb-4 text-center">
          Cerrar Sesión
        </h2>
        <p className="text-black text-center mb-4">
          ¿Seguro que deseas cerrar sesión?
        </p>
        <div className="flex justify-center gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-[#6a62dc] text-white px-4 py-2 rounded"
            onClick={handleConfirm}
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}
