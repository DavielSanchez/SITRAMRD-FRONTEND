import React, { useState, useEffect } from "react";

export default function Color({ onClose, onColorSelect, theme }) {
  const [tempTheme, setTempTheme] = useState(theme || "light"); 

  useEffect(() => {
    setTempTheme(theme); // Actualiza el estado cuando cambia el prop theme
  }, [theme]);

  // selección de tema 
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
      className="absolute inset-0 flex justify-center items-center backdrop-blur-md bg-black/20 z-50"
      onClick={onClose} // Cerrar el modal 
    >
      <div
        className="w-80 bg-white p-6 rounded-lg border-2 border-[#6a62dc] shadow-xl"
        onClick={(e) => e.stopPropagation()} // Evita cerrar si se hace clic dentro
      >
        <h2 className="text-lg font-semibold text-[#6a62dc] mb-4">Selecciona un tema</h2>

        {/* Opción de Tema Claro */}
        <div
          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
            tempTheme === "light" ? "border-[#6a62dc] ring-2 ring-[#6a62dc]" : "border-gray-300"
          }`}
          onClick={() => handleThemeSelection("light")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border border-gray-300 rounded"></div>
            <span className="text-gray-700">Claro</span>
          </div>
          {tempTheme === "light" && <span className="text-[#6a62dc] font-bold">✓</span>}
        </div>

        {/* Opción de Tema Oscuro */}
        <div
          className={`flex items-center justify-between p-4 mt-3 rounded-lg border cursor-pointer transition-all ${
            tempTheme === "dark" ? "border-[#ff4444] ring-2 ring-[#ff4444]" : "border-gray-300"
          }`}
          onClick={() => handleThemeSelection("dark")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black border border-gray-300 rounded flex items-center justify-center">
              <span className="text-red-500 font-bold">N</span>
            </div>
            <span className="text-gray-700">Oscuro</span>
          </div>
          {tempTheme === "dark" && <span className="text-red-500 font-bold">✓</span>}
        </div>

        {/* Botones */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setTempTheme(theme); // Restaurar el tema previo al cerrar
              onClose();
            }}
          >
            Cancelar
          </button>
          <button
            className="bg-[#6a62dc] text-white px-4 py-2 rounded"
            onClick={handleSave} // Aplica el tema seleccionado y cierra
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
