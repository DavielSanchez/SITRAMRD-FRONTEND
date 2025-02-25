import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ellipse19 from "/src/assets/Settings/Ellipse19.svg"; 
import Lapiz from "/src/assets/Settings/lapiz.svg"; 
import { jwtDecode } from "jwt-decode";

export default function EditarPerfil({ onClose, theme }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.nombre;
  const id = decodedToken.id;

  // Inicializamos los estados con la información actual del usuario
  const [nombre, setNombre] = useState(username || "");

  const handleConfirm = async () => {
    try {
      // Se utiliza la URL completa del backend para actualizar el usuario
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users/put/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario actualizado:", data.usuario);
        navigate("/settings");
      } else {
        alert(data.message || "Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      alert("Error en el servidor");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center backdrop-blur-md ${
        theme === "dark" ? "bg-black/50" : "bg-black/30"
      } z-50 min-h-screen px-4`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md p-6 rounded-lg border-2 shadow-xl relative ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-white border-[#ff5353]"
            : "bg-white text-black border-[#6a62dc]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4 relative">
          <img src={Ellipse19} alt="Profile" className="w-20 h-20" />
          <img src={Lapiz} alt="Edit" className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="space-y-3">
          <div>
            <label className={`block ${theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"}`}>
              Nombre
            </label>
            <input 
              type="text" 
              placeholder="Nombre de usuario" 
              className={`w-full px-3 py-2 border rounded ${
                theme === "dark" ? "bg-[#333] text-white border-[#ff5353]" : "bg-gray-100 text-black border-[#6a62dc]"
              }`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button 
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark" ? "bg-[#6a62dc] text-white" : "bg-[#ff5353] text-white"
            }`}
            onClick={handleConfirm}
          >
            Guardar
          </button>
          <button 
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark" ? "bg-[#ff5353] text-white" : "bg-[#6a62dc] text-white"
          }`}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}