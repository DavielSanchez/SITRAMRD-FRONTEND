import { useState } from "react";
import metro from "../../../assets/Map/8579892.webp";
import bus from "../../../assets/Map/4844858.webp";
import teleferico from "../../../assets/Map/7778238.webp";
import { iniciarViaje } from "../utils/Events";

function ConfirmationModal({ onClose, lat, lng, destinoLat, destinoLng, map, start }) {
  const [metodoPreferido, setMetodoPreferido] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMetodoClick = (metodo) => {
    setMetodoPreferido((prev) =>
      prev.includes(metodo)
        ? prev.filter((m) => m !== metodo)
        : [...prev, metodo]
    );
  };

  const handleConfirmar = async () => {
    setIsLoading(true);
    start()
    try {
      await iniciarViaje(lat, lng, destinoLat, destinoLng, map);
      onClose();
    } catch (error) {
      console.error("Error al obtener el viaje:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const opciones = [
    { nombre: "Bus", imagen: bus, color: "blue" },
    { nombre: "Metro", imagen: metro, color: "red" },
    { nombre: "Teleferico", imagen: teleferico, color: "yellow" },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fade-in overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Selecciona tu método preferido</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-gray-600 text-sm">
            {metodoPreferido.length ? (
              <div className="flex items-center space-x-2">
                <span>Seleccionado:</span>
                <div className="flex flex-wrap gap-2">
                  {metodoPreferido.map(metodo => (
                    <span 
                      key={metodo}
                      className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {metodo}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <span>Selecciona al menos una opción</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {opciones.map(({ nombre, imagen, color }) => (
              <div
                key={nombre}
                onClick={() => handleMetodoClick(nombre)}
                className={`flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 transition-all duration-300 p-4 hover:shadow-lg ${
                  metodoPreferido.includes(nombre)
                    ? "border-indigo-500 bg-indigo-50 transform scale-105"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <div className="w-16 h-16 mb-2 overflow-hidden rounded-full bg-gray-100 p-2 flex items-center justify-center">
                  <img src={imagen} alt={nombre} className="w-10 h-10 object-contain" />
                </div>
                <span className={`text-sm font-medium ${metodoPreferido.includes(nombre) ? "text-indigo-700" : "text-gray-700"}`}>
                  {nombre}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={metodoPreferido.length === 0 || isLoading}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
              metodoPreferido.length === 0 || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </div>
            ) : (
              "Confirmar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;