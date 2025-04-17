import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getDirecciones } from '../utils/ApiCall';



function DirectionModal({ onClose, latitud, longitud, destinoLat, destinoLng, style, mapboxToken = "pk.eyJ1IjoibmVvZGV2IiwiYSI6ImNtOGQ4ZmIxMzBtc2kybHBzdzNxa3U4eDcifQ.1Oa8lXU045VvFUul26Kwkg" }) {
    const [direcciones, setDirecciones] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedStep, setExpandedStep] = useState(null);
    
    // Función para formatear tiempo en minutos y segundos
    const formatTiempo = (segundos) => {
        if (!segundos && segundos !== 0) return "--";
        
        const minutos = Math.floor(segundos / 60);
        const segs = Math.round(segundos % 60);
        
        if (minutos === 0) {
            return `${segs} seg`;
        }
        return segs > 0 ? `${minutos} min ${segs} seg` : `${minutos} min`;
    };
    
    // Función para formatear distancia
    const formatDistancia = (metros) => {
        if (!metros && metros !== 0) return "--";
        
        return metros >= 1000 
            ? `${(metros / 1000).toFixed(1)} km` 
            : `${Math.round(metros)} m`;
    };

    // Obtener direcciones al cargar el componente
    useEffect(() => {
        const obtenerRuta = async () => {
            if (!latitud || !longitud || !destinoLat || !destinoLng) {
                setLoading(false);
                return;
            }
            
            try {
                const resultado = await getDirecciones(
                    latitud, 
                    longitud, 
                    destinoLat, 
                    destinoLng, 
                    mapboxToken
                );
                setDirecciones(resultado);
                setError(null);
            } catch (err) {
                console.error("Error al obtener direcciones:", err);
                setError("No se pudieron cargar las instrucciones para llegar a la parada");
            } finally {
                setLoading(false);
            }
        };
        
        obtenerRuta();
    }, [latitud, longitud, destinoLat, destinoLng, mapboxToken]);

    return (
        <div className={`bg-gray-800 text-white rounded-xl shadow-2xl overflow-hidden ${style}`} draggable="false">
            {/* Encabezado */}
            <div className="bg-blue-600 p-2 rounded-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-lg font-bold">Direcciones a la parada de autobus</h3>
                    </div>
                    
                    <button
                        onClick={onClose}
                        className="text-white bg-blue-700 hover:bg-blue-800 rounded-full p-1 transition-colors"
                        aria-label="Cerrar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        <p className="mt-3 text-sm text-gray-300">Calculando ruta...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-center">
                        <p className="text-red-300">{error}</p>
                    </div>
                ) : direcciones ? (
                    <div>
                        {/* Información de resumen */}
                        <div className="bg-gray-700 rounded-lg p-3 mb-4 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-300">Distancia</p>
                                <p className="font-bold">{formatDistancia(direcciones.distanciaTotal)}</p>
                            </div>
                            <div className="flex items-center px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-300">Tiempo estimado</p>
                                <p className="font-bold">{formatTiempo(direcciones.duracionTotal)}</p>
                            </div>
                        </div>
                        
                        {/* Instrucciones paso a paso */}
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Sigue estos pasos:</h4>
                        
                        <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                            {direcciones.pasos.map((paso, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
                                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                                >
                                    <div className="p-3 flex items-start">
                                        <div className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm">{paso.instruccion}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {formatDistancia(paso.distancia)} · {formatTiempo(paso.duracion)}
                                            </p>
                                            
                                            {expandedStep === index && (
                                                <div className="mt-2 text-xs text-gray-300 bg-gray-800 p-2 rounded">
                                                    <p>Vía: {paso.nombre}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Aviso */}
                        <div className="mt-4 text-xs text-gray-400 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>Toca en cada paso para ver más detalles. Los tiempos son estimados caminando a velocidad normal.</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-gray-400">No hay información disponible para mostrar.</p>
                    </div>
                )}
            </div>
            
            {/* Botón de cierre en la parte inferior */}
            <div className="bg-gray-900 p-4">
                <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default DirectionModal;