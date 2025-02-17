import React from "react";
import { useNavigate } from "react-router-dom";

export default function CerrarSesion({ onClose }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/Auth"); // Redirige a Auth.jsx
  };

  return (
    <div
      className="absolute inset-0 flex justify-center items-center backdrop-blur-md bg-black/20 z-50"
      onClick={onClose}
    >
      <div
        className="w-80 bg-white p-6 rounded-lg border-2 border-[#6a62dc] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-[#6a62dc] mb-4">Cerrar Sesión</h2>
        <p className="text-black text-center mb-4">
          ¿Seguro que deseas cerrar sesión?
        </p>
        <div className="flex justify-end gap-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
            No
          </button>
          <button className="bg-[#6a62dc] text-white px-4 py-2 rounded" onClick={handleConfirm}>
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}

