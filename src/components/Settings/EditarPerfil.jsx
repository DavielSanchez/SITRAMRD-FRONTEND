import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LensIcon from '@mui/icons-material/Lens';
import EditIcon from '@mui/icons-material/Edit';

export default function EditarPerfil({ onClose, theme, onImageUpdate }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.nombre;
  const id = decodedToken.id;

  // Estados para el nombre de usuario y la imagen
  const [nombre, setNombre] = useState(username || "");
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Función para subir la imagen a Cloudinary
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imagenes_usuario"); // Ajusta si tu preset es otro

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duxzwvupw/image/upload", // Ajusta tu Cloud Name si es necesario
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url); // Guarda el enlace de la imagen subida
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      alert("Error subiendo la imagen");
    }
  };

  const handleConfirm = async () => {
    try {
      // Se envían el nombre y la imagen al backend
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users/put/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, imageUrl })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario actualizado:", data.usuario);
        // Actualizamos la imagen en Ajustes si se subió alguna
        if (imageUrl && onImageUpdate) {
          onImageUpdate(imageUrl);
        }
        onClose(); // Cierra el modal
        navigate("/settings"); // Navega a settings (opcional)
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
          {/* Si imageUrl existe, se muestra la imagen; de lo contrario, se muestra LensIcon */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Perfil"
              className="rounded-full object-cover"
              style={{ width: "90px", height: "90px" }}
            />
          ) : (
            <LensIcon
              sx={{
                color: theme === "dark" ? "#ff5353" : "gray",
                fontSize: 90,
              }}
            />
          )}
          <EditIcon
            sx={{
              color: "white",
              fontSize: 28,
              cursor: "pointer",
            }}
            className="absolute top-1/2 transform -translate-y-1/2"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          />
          {/* Input de archivo oculto */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleUpload}
          />
        </div>
        <div className="space-y-3">
          <div>
            <label
              className={`block ${
                theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
              }`}
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className={`w-full px-3 py-2 border rounded ${
                theme === "dark"
                  ? "bg-[#333] text-white border-[#ff5353]"
                  : "bg-gray-100 text-black border-[#6a62dc]"
              }`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark" ? "bg-[#6a62dc] text-white" : "bg-[#f16900] text-white"
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
