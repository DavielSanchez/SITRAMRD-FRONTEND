import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";

export default function EditarPerfil({ onClose, theme, onProfileUpdate }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem("token"); // Limpiar token inválido
      navigate("/login");
      return null;
    }
  }

  const username = decodedToken?.nombre || "";
  const id = decodedToken?.id || "";
  const userImage =
    decodedToken?.userImage ||
    "https://res.cloudinary.com/dv4wfetu1/image/upload/v1740610245/avatar_qspfc1.svg";

  const [nombre, setNombre] = useState(username);
  const [imageUrl, setImageUrl] = useState(userImage);
  const fileInputRef = useRef(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Error al subir la imagen");

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      alert("No se pudo subir la imagen");
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/auth/users/put/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, userImage: imageUrl }),
        }
      );

      const userData = await response.json();

      if (!response.ok) throw new Error(userData.message || "Error desconocido");

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        onProfileUpdate(imageUrl, nombre);
      }
      onClose();
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert(error.message);
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
            ? "bg-[#1E1E1E] text-white border-[var(--primary-orange-color)]"
            : "bg-white text-black border-[#6a62dc]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4 relative">
          <img
            src={imageUrl}
            alt="Perfil"
            className="rounded-full object-cover"
            style={{ width: "90px", height: "90px" }}
          />
          <EditIcon
            sx={{ color: "white", fontSize: 28, cursor: "pointer" }}
            className="absolute top-1/2 transform -translate-y-1/2"
            onClick={() => fileInputRef.current?.click()}
          />
          <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleUpload} />
        </div>

        <div className="space-y-3">
          <label className={`block ${theme === "dark" ? "text-[var(--primary-orange-color)]" : "text-[var(--primary-orange-color)]"}`}>
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre de usuario"
            className={`w-full px-3 py-2 border rounded ${
              theme === "dark" ? "bg-[#333] text-white border-[var(--primary-orange-color)]" : "bg-gray-100 text-black border-[var(--primary-orange-color)]"
            }`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark" ? "bg-[var(--primary-orange-color)] text-white" : "bg-[var(--primary-orange-color)] text-white"
            }`}
            onClick={updateProfile}
          >
            Guardar
          </button>
          <button
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark" ? "bg-[var(--primary-orange-color)] text-white" : "bg-[var(--primary-orange-color)] text-white"
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
