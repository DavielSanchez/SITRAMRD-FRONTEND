// iniciarViaje(): Comienza un nuevo viaje, guarda datos en localStorage y dibuja la ruta
// cancelarViaje(): Cancela el viaje actual, actualiza estado y limpia rutas
// completarViaje(): Marca el viaje como completado
// reiniciarViaje(): Elimina todos los datos del viaje actual
// restaurarViaje(): Recupera y redibuja un viaje guardado cuando se recarga la página
// hayViajeActivo(): Verifica si existe un viaje en proceso
// registrarPasoCompletado(): Actualiza el progreso del viaje

import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { getViaje } from './ApiCall';
import drawRouteLines, { drawWalkingRoute, drawBusRoute, drawTransferRoute, clearAllRoutes } from '../draw/drawRouteLines'

// Constantes para las claves de localStorage
const STORAGE_KEYS = {
  ORIGEN: "viaje_origen",
  DESTINO: "viaje_destino",
  ESTADO: "viaje_estado",
  DATOS_RUTA: "viaje_datos_ruta",
  ULTIMO_PASO: "viaje_ultimo_paso",
  TIEMPO_INICIO: "viaje_tiempo_inicio"
};

// Estados posibles del viaje
const ESTADO_VIAJE = {
  ACTIVO: "activo",
  CANCELADO: "cancelado",
  COMPLETADO: "completado",
  PENDIENTE: "pendiente"
};


export const iniciarViaje = async (lat, lng, destinoLat, destinoLng, map) => {
  try {
    const origen = { lat, lng };
    const destino = { lat: destinoLat, lng: destinoLng };
    
    localStorage.setItem(STORAGE_KEYS.ORIGEN, JSON.stringify(origen));
    localStorage.setItem(STORAGE_KEYS.DESTINO, JSON.stringify(destino));
    localStorage.setItem(STORAGE_KEYS.ESTADO, ESTADO_VIAJE.ACTIVO);
    localStorage.setItem(STORAGE_KEYS.TIEMPO_INICIO, Date.now().toString());
    
    // Obtener y dibujar la ruta
    const datosViaje = await getViaje(lat, lng, destinoLat, destinoLng, map);
    
    // Guardar datos de la ruta
    if (datosViaje) {
      localStorage.setItem(STORAGE_KEYS.DATOS_RUTA, JSON.stringify(datosViaje));
      localStorage.setItem(STORAGE_KEYS.ULTIMO_PASO, "inicio");
    }
    
    return datosViaje;
  } catch (error) {
    console.error("Error al iniciar el viaje:", error);
    throw error;
  }
};

export const actualizarEstadoViaje = (estado = ESTADO_VIAJE.CANCELADO, paso = null) => {
  localStorage.setItem(STORAGE_KEYS.ESTADO, estado);
  
  if (paso) {
    localStorage.setItem(STORAGE_KEYS.ULTIMO_PASO, paso);
  }
  
  // Si se cancela o completa, podríamos guardar estadísticas
  if (estado === ESTADO_VIAJE.CANCELADO || estado === ESTADO_VIAJE.COMPLETADO) {
    const tiempoInicio = parseInt(localStorage.getItem(STORAGE_KEYS.TIEMPO_INICIO) || "0");
    const duracion = Date.now() - tiempoInicio;
    
    // Aquí podrías enviar estos datos al servidor si es necesario
    console.log(`Viaje ${estado} después de ${duracion / 1000} segundos`);
  }
};


export const cancelarViaje = (map) => {
  actualizarEstadoViaje(ESTADO_VIAJE.CANCELADO);
  
  if (map && map.loaded()) {
    clearAllRoutes(map);
  }
};

/**
 * Marca el viaje como completado
 */
export const completarViaje = () => {
  actualizarEstadoViaje(ESTADO_VIAJE.COMPLETADO, "destino");
};

export const reiniciarViaje = (map) => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  
  // Limpiar el mapa
  if (map && map.loaded()) {
    clearAllRoutes(map);
  }
};


export const hayViajeActivo = () => {
  const estado = localStorage.getItem(STORAGE_KEYS.ESTADO);
  return estado === ESTADO_VIAJE.ACTIVO || estado === ESTADO_VIAJE.PENDIENTE;
};


export const obtenerDatosViaje = () => {
  try {
    const origen = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORIGEN));
    const destino = JSON.parse(localStorage.getItem(STORAGE_KEYS.DESTINO));
    const estado = localStorage.getItem(STORAGE_KEYS.ESTADO);
    const datosRuta = JSON.parse(localStorage.getItem(STORAGE_KEYS.DATOS_RUTA));
    const ultimoPaso = localStorage.getItem(STORAGE_KEYS.ULTIMO_PASO);
    
    if (!origen || !destino) return null;
    
    return {
      origen,
      destino,
      estado,
      datosRuta,
      ultimoPaso,
      tiempoInicio: parseInt(localStorage.getItem(STORAGE_KEYS.TIEMPO_INICIO) || "0")
    };
  } catch (error) {
    console.error("Error al recuperar datos del viaje:", error);
    return null;
  }
};

export const restaurarViaje = async (map) => {
  const datosViaje = obtenerDatosViaje();
  
  if (!datosViaje || !datosViaje.origen || !datosViaje.destino) {
    return null;
  }
  
  if (!map.loaded()) {
    return new Promise((resolve) => {
      map.once('load', () => {
        resolve(restaurarViaje(map));
      });
    });
  }
  
  try {
    clearAllRoutes(map);
    
    const { origen, destino } = datosViaje;
    
    if (datosViaje.datosRuta && datosViaje.datosRuta.data) {
      await redibujarRuta(map, origen, destino, datosViaje.datosRuta.data);
      return datosViaje;
    } else {
      return await getViaje(origen.lat, origen.lng, destino.lat, destino.lng, map);
    }
  } catch (error) {
    console.error("Error al restaurar viaje:", error);
    return null;
  }
};

const redibujarRuta = async (map, origen, destino, datos) => {
  const userLocation = { latitude: origen.lat, longitude: origen.lng };
  const destinationLocation = { lat: destino.lat, lng: destino.lng };
  
  drawRouteLines(map, userLocation, destinationLocation);
  
  if (datos.tipo === 'Directa') {
    await drawWalkingRoute(map, userLocation, datos['Parada De Inicio'].ubicacion);
    await drawBusRoute(
      map, 
      datos['Parada De Inicio'].ubicacion, 
      datos['Parada de destino'].ubicacion, 
      1
    );
  } else if (datos.tipo === 'Con Transbordo') {
    await drawWalkingRoute(map, userLocation, datos['Parada De Inicio'].ubicacion);
    await drawBusRoute(
      map, 
      datos['Parada De Inicio'].ubicacion, 
      datos['Parada Intermedia (bajada)'].ubicacion, 
      1
    );
    await drawTransferRoute(
      map,
      datos['Parada Intermedia (bajada)'].ubicacion,
      datos['Parada Intermedia (subida)'].ubicacion
    );
    await drawBusRoute(
      map,
      datos['Parada Intermedia (subida)'].ubicacion,
      datos['Parada De Destino'].ubicacion,
      2
    );
  }
};

export const registrarPasoCompletado = (paso, datos = {}) => {
  localStorage.setItem(STORAGE_KEYS.ULTIMO_PASO, paso);
  
  console.log(`Paso completado: ${paso}`, datos);
};

// Exportar constantes
export const VIAJE_ESTADO = ESTADO_VIAJE;