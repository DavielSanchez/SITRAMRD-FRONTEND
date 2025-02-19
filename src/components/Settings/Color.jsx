import React, { useState, useEffect } from "react";

export default function Color({ onClose, onColorSelect, theme }) {
  const [tempTheme, setTempTheme] = useState(theme || "light");

  useEffect(() => {
    
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

    setTempTheme(theme);
  }, [theme]);

  // Selección de tema
  const handleThemeSelection = (selectedTheme) => {
    setTempTheme(selectedTheme);
  };

  // Aplicar el tema seleccionado
  const handleSave = () => {
    onColorSelect(tempTheme);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center backdrop-blur-md ${
        theme === "dark" ? "bg-black/50" : "bg-black/30"
      } z-50 p-4`}
      onClick={onClose} // Cerrar el modal al hacer clic fuera
    >
      <div
        className={`w-full max-w-sm p-6 rounded-lg border-2 shadow-xl ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-white border-[#ff5353]"
            : "bg-white text-black border-[#6a62dc]"
        }`}
        onClick={(e) => e.stopPropagation()} // Evita cerrar si se hace clic dentro
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
          }`}
        >
          Selecciona un tema
        </h2>

        {/* Opción de Tema Claro */}
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
            <span className={theme === "dark" ? "text-white" : "text-gray-700"}>
              Claro
            </span>
          </div>
          {tempTheme === "light" && (
            <span className={theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"}>
              ✓
            </span>
          )}
        </div>

        {/* Opción de Tema Oscuro */}
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
            <span className={theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"}>
              ✓
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark" ? "bg-[#ff5353] text-white" : "bg-[#554dcf] text-white"
            } hover:bg-[#554dcf]`}
            onClick={() => {
              setTempTheme(theme); // Restaurar el tema previo al cerrar
              onClose();
            }}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 rounded transition-all ${
              theme === "dark" ? "bg-[#554dcf] text-white" : "bg-[#f16900] text-white"
            } hover:bg-[#f16900]`}
            onClick={handleSave} // Aplica el tema seleccionado y cierra
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
