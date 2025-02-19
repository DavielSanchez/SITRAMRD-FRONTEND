import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ellipse19 from "/src/assets/Settings/Ellipse19.svg"; 
import Lapiz from "/src/assets/Settings/lapiz.svg"; 

export default function PerfilUsuario({ onClose, userData }) {
  const navigate = useNavigate();

  // Inicializamos los estados con la información actual del usuario
  const [nombre, setNombre] = useState(userData?.nombre || '');
  const [apellido, setApellido] = useState(userData?.apellido || '');
  // Aunque se muestra el correo, no se permite editarlo
  const [correo, setCorreo] = useState(userData?.correo || '');
  // Campos opcionales para actualizar rol y estado
  const [userRol, setUserRol] = useState(userData?.userRol || "Pasajero");
  const [estadoUsuario, setEstadoUsuario] = useState(userData?.estadoUsuario || "activo");

  const handleConfirm = async () => {
    try {
      // Se utiliza la URL completa del backend
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users/put/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          apellido,
          userRol,
          estadoUsuario
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario actualizado:", data.usuario);
        // Redirige a la ruta deseada después de la actualización
        navigate("/Auth");
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
            <input 
              type="text" 
              placeholder="Nombre de usuario" 
              className="w-full px-3 py-2 border rounded bg-gray-100" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[#6a62dc] block">Apellido</label>
            <input 
              type="text" 
              placeholder="Apellido del usuario" 
              className="w-full px-3 py-2 border rounded bg-gray-100" 
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[#6a62dc] block">Correo</label>
            <input 
              type="email" 
              placeholder="Correo del usuario" 
              className="w-full px-3 py-2 border rounded bg-gray-100" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="text-[#6a62dc] block">Rol de Usuario</label>
            <select 
              value={userRol} 
              onChange={(e) => setUserRol(e.target.value)} 
              className="w-full px-3 py-2 border rounded bg-gray-100"
            >
              <option value="Pasajero">Pasajero</option>
              <option value="Operador">Operador</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <div>
            <label className="text-[#6a62dc] block">Estado de Usuario</label>
            <select 
              value={estadoUsuario} 
              onChange={(e) => setEstadoUsuario(e.target.value)} 
              className="w-full px-3 py-2 border rounded bg-gray-100"
            >
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="bg-[#6a62dc] text-white px-4 py-2 rounded" 
            onClick={handleConfirm}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
