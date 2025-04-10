import React from 'react';

function RouteModal({ destination, userLocation, onConfirm, onCancel, nearestStop }) {
  if (!destination || !userLocation) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-80 max-w-sm z-50"
    >
      <div className="flex flex-col items-center">
        {/* Icono representativo */}
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9-5-9-5-9 5 9 5zm0 0V5l-9 5"
            />
          </svg>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-semibold text-gray-800">Confirmar Destino</h3>

        {/* Descripción del destino */}
        <p className="mt-2 text-sm text-gray-600 text-center">
          ¿Quieres ir a esta ubicación? A continuación se muestran los detalles de la dirección.
        </p>

        {/* Información sobre la ubicación */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-800">Latitud: {destination.lat}</p>
          <p className="text-sm font-medium text-gray-800">Longitud: {destination.lng}</p>
          <p className="text-sm font-medium text-gray-800">Parada cercana: {nearestStop}</p>
        </div>

        {/* Espacio entre la información y los botones */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white p-3 rounded-lg w-32 font-semibold transition-transform transform hover:scale-105"
          >
            Sí, ir allí
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white p-3 rounded-lg w-32 font-semibold transition-transform transform hover:scale-105"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RouteModal;
