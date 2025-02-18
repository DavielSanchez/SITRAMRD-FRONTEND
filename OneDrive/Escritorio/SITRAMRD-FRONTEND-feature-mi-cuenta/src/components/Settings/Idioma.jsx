import React from "react";

export default function Idioma({ onClose }) {
  const handleCancel = () => {
    // Cierra el modal al hacer clic en "Cancelar"
    onClose();
  };

  const handleContinue = () => {
    // Lógica para guardar/cambiar el idioma
    // ...
    // Cierra el modal si lo deseas
    onClose();
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
        {/* Etiqueta para el idioma */}
        <label className="text-[#6a62dc] block mb-2">Idioma</label>

        {/* Contenedor relativo para el select y la flecha */}
        <div className="relative">
          <select
            className="w-full px-3 py-2 border rounded bg-gray-100 appearance-none"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
          {/* Flecha del select */}
          <div className="absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586 
                  l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 
                  1 0 01-1.414 0l-4-4a1 1 0 
                  010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Botones para Cancelar y Continuar */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-[#6a62dc] text-white px-4 py-2 rounded"
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
