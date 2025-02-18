import React from "react";
import { useNavigate } from "react-router-dom";
import Ellipse19 from "/src/assets/Settings/Ellipse19.svg"; // Ruta absoluta
import Lapiz from "/src/assets/Settings/lapiz.svg"; // Ruta absoluta

export default function PerfilUsuario({ onClose }) {
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
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white p-6 rounded-lg border-2 border-[#6a62dc] shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4 relative">
          <img src={Ellipse19} alt="Profile" className="w-20 h-20" />
          <img src={Lapiz} alt="Edit" className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[#6a62dc] block">Nombre</label>
            <input type="text" placeholder="Nombre de usuario" className="w-full px-3 py-2 border rounded bg-gray-100" />
          </div>
          <div>
            <label className="text-[#6a62dc] block">Apellido</label>
            <input type="text" placeholder="Apellido del usuario" className="w-full px-3 py-2 border rounded bg-gray-100" />
          </div>
          <div>
            <label className="text-[#6a62dc] block">Correo</label>
            <input type="email" placeholder="Correo del usuario" className="w-full px-3 py-2 border rounded bg-gray-100" />
          </div>
          <div>
            <label className="text-[#6a62dc] block">Apellido</label>
            <input type="text" placeholder="Apellido del usuario" className="w-full px-3 py-2 border rounded bg-gray-100" />
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
          <button className="bg-[#6a62dc] text-white px-4 py-2 rounded">Continuar</button>
        </div>
      </div>
    </div>
  );
}