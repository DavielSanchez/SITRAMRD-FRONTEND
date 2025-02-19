import React from "react";

export default function Idioma({ onClose, theme }) {
  const handleCancel = () => {
    onClose();
  };

  const handleContinue = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center backdrop-blur-md ${
        theme === "dark" ? "bg-black/50" : "bg-black/30"
      } z-50 min-h-screen px-4`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-[90%] sm:max-w-sm lg:max-w-md xl:max-w-lg p-6 rounded-lg border-2 shadow-xl ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-white border-[#ff5353]"
            : "bg-white text-black border-[#6a62dc]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <label
          className={`block mb-2 ${
            theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
          }`}
        >
          Idioma
        </label>

        <div className="relative">
          <select
            className={`w-full px-3 py-2 border rounded appearance-none ${
              theme === "dark"
                ? "bg-[#333] text-white border-[#ff5353]"
                : "bg-gray-100 text-black"
            }`}
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
          <div className="absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none">
            <svg
              className={`w-4 h-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
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

        <div className="flex justify-center gap-2 mt-4">
          <button
            className={`px-4 py-2 rounded text-white ${
              theme === "dark" ? "bg-[#ff5353]" : "bg-[#6a62dc]"
            }`}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${
              theme === "dark" ? "bg-[#6a62dc]" : "bg-[#f16900]"
            }`}
            onClick={handleContinue}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}