import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Color({ onClose, onColorSelect, theme }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedtoken = jwtDecode(token);
  console.log(decodedtoken);

  let decodedToken;
  try {
    decodedToken = token ? jwtDecode(token) : null;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }

  const userTheme = decodedToken?.theme || "light"; // Valor por defecto
  const id = decodedToken?.id || "";

  const [tempTheme, setTempTheme] = useState(userTheme);

  const handleThemeSelection = (selectedTheme) => {
    setTempTheme(selectedTheme);
  };

  const handleSave = () => {
    onColorSelect(tempTheme);
    onClose();
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users/put/theme/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ theme: tempTheme }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Usuario actualizado:", data);
  
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.reload();
        } else {
          navigate("/settings");
        }
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
      } z-50 p-4`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-sm p-6 rounded-lg border-2 shadow-xl ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-[var(--color-dark)] border-[#ff5353]"
            : "bg-white text-black border-[#6a62dc]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
          }`}
        >
          Selecciona un tema
        </h2>

        {/* Tema Claro */}
        <div
          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
            tempTheme === "light"
              ? theme === "dark"
                ? "border-[#ff5353] ring-2 ring-[#ff5353]"
                : "border-[#6a62dc] ring-2 ring-[#6a62dc]"
              : "border-gray-300"
          }`}
          onClick={() => handleThemeSelection("light")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border border-gray-300 rounded"></div>
            <span className={theme === "dark" ? "text-[var(--color-dark)]" : "text-gray-700"}>
              Claro
            </span>
          </div>
          {tempTheme === "light" && (
            <span
              className={theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"}
            >
              ✓
            </span>
          )}
        </div>

        {/* Tema Oscuro */}
        <div
          className={`flex items-center justify-between p-4 mt-3 rounded-lg border cursor-pointer transition-all ${
            tempTheme === "dark"
              ? theme === "dark"
                ? "border-[#ff5353] ring-2 ring-[#ff5353]"
                : "border-[#6a62dc] ring-2 ring-[#6a62dc]"
              : "border-gray-300"
          }`}
          onClick={() => handleThemeSelection("dark")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black border border-gray-300 rounded flex items-center justify-center">
              <span className="text-red-500 font-bold">N</span>
            </div>
            <span className={theme === "dark" ? "text-white" : "text-gray-700"}>
              Oscuro
            </span>
          </div>
          {tempTheme === "dark" && (
            <span
              className={theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"}
            >
              ✓
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark"
                ? "bg-[#554dcf] text-white"
                : "bg-[#ff5353] text-white"
            } hover:bg-[#ff5353]`}
            onClick={() => {
              handleSave();
              handleConfirm();
            }}
          >
            Guardar
          </button>
          <button
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark"
                ? "bg-[#ff5353] text-white"
                : "bg-[#554dcf] text-white"
            } hover:bg-[#554dcf]`}
            onClick={onClose} 
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}