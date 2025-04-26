import React, { useState, useEffect } from 'react';
import { getDirecciones } from "../utils/ApiCall"

function RouteModal({ destination, userLocation, onConfirm, onCancel, nearestStop, mapboxToken }) {
  const [direcciones, setDirecciones] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);

  useEffect(() => {
    const fetchDirecciones = async () => {
      if (!destination || !userLocation || !nearestStop) return;
      
      setLoading(true);
      try {
        // Obtener direcciones desde la ubicación del usuario hasta la parada más cercana
        const resultado = await getDirecciones(
          userLocation.latitude,
          userLocation.longitude,
          nearestStop.location.lat,
          nearestStop.location.lng,
          mapboxToken
        );
        setDirecciones(resultado);
        setError(null);
      } catch (err) {
        console.error("Error al obtener direcciones:", err);
        setError("No pudimos cargar las instrucciones de ruta");
      } finally {
        setLoading(false);
      }
    };

    fetchDirecciones();
  }, [destination, userLocation, nearestStop, mapboxToken]);

  if (!destination || !userLocation) return null;

  // Función para formatear tiempo en minutos y segundos
  const formatTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segs = Math.round(segundos % 60);
    
    if (minutos === 0) {
      return `${segs} seg`;
    }
    return segs > 0 ? `${minutos} min ${segs} seg` : `${minutos} min`;
  };
  
  // Función para formatear distancia
  const formatDistancia = (metros) => {
    return metros >= 1000 
      ? `${(metros / 1000).toFixed(1)} km` 
      : `${Math.round(metros)} m`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">Tu Ruta</h3>
            <div className="bg-white text-blue-600 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-blue-100">
            A continuación se muestran las instrucciones para llegar a tu destino
          </p>
        </div>

        {/* Cuerpo */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* Información de origen y destino */}
          <div className="flex items-start mb-6 pb-4 border-b border-gray-200">
            <div className="w-full">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="4" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tu ubicación actual</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Destino seleccionado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instrucciones paso a paso */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-6">
              <p className="text-red-500">{error}</p>
              <p className="text-sm text-gray-500 mt-2">Puedes continuar sin instrucciones</p>
            </div>
          ) : direcciones ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2 py-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-700">Distancia total</p>
                  <p className="font-bold text-blue-600">{formatDistancia(direcciones.distanciaTotal)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tiempo estimado</p>
                  <p className="font-bold text-blue-600">{formatTiempo(direcciones.duracionTotal)}</p>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mt-4 mb-2">Instrucciones:</h4>
              
              {direcciones.pasos.map((paso, index) => (
                <div 
                  key={index}
                  className="border-l-4 border-blue-400 pl-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-700 font-medium">{paso.instruccion}</p>
                    </div>
                    <svg 
                      className={`h-4 w-4 text-gray-500 transition-transform ${expandedStep === index ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {expandedStep === index && (
                    <div className="mt-2 ml-8 text-sm text-gray-600">
                      <p>Nombre: {paso.nombre}</p>
                      <p>Distancia: {formatDistancia(paso.distancia)}</p>
                      <p>Duración: {formatTiempo(paso.duracion)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : nearestStop ? (
            <div className="text-center py-6">
              <p className="text-gray-500">Calculando ruta a la parada más cercana...</p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No hay información disponible sobre la parada más cercana.</p>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="bg-gray-50 px-6 py-4 flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex-1 max-w-xs flex items-center justify-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Comenzar ruta
          </button>
          <button
            onClick={onCancel}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-5 py-3 rounded-lg font-medium transition-all duration-200 flex-1 max-w-xs"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RouteModal;