import axios from "axios";
import drawRouteLines, { 
  drawWalkingRoute, 
  drawBusRoute, 
  drawTransferRoute, 
  clearAllRoutes 
} from "../draw/drawRouteLines";

import { jwtDecode } from 'jwt-decode';

//Esto llama a la api y devuelve el viaje recomendado

export const getViaje = (lat, lng, destinoLat, destinoLng, map) => {
  // Verificar que el mapa existe
  if (!map) {
    console.error('El mapa no está definido en getViaje');
    return Promise.reject(new Error('Mapa no disponible'));
  }

  // Verificar que el mapa está listo para ser usado
  if (!map.loaded()) {
    console.log('El mapa está cargando, esperando...');
    
    // Devolvemos una promesa que se resolverá cuando el mapa esté listo
    return new Promise((resolve) => {
      map.once('load', () => {
        console.log('Mapa cargado, procediendo con getViaje');
        // Ahora que el mapa está listo, llamamos recursivamente a getViaje
        resolve(getViaje(lat, lng, destinoLat, destinoLng, map));
      });
    });
  }

  // First clear any existing routes
  clearAllRoutes(map);
  
  // Define user location and destination
  const userLocation = { latitude: lat, longitude: lng };
  const destination = { lat: destinoLat, lng: destinoLng };
  
  // Initialize the markers for user and destination
  drawRouteLines(map, userLocation, destination);
  
  // Call the API
  return axios.get('http://localhost:3001/ruta/RutasAutoBus', {
    params: {
      lat: lat,
      lng: lng,
      destinoLat: destinoLat,
      destinoLng: destinoLng,
      tipo: "Metro"
    }
  }).then(async (response) => {
    const data = response.data;
    console.log('Datos de ruta recibidos:', data);
    
    let distanciaTotal = 0;
    let tiempoEstimado = 0;
    
    if (data.tipo === 'Directa') {
      // Draw walking route to first bus stop
      const distanciaInicial = await drawWalkingRoute(map, userLocation, data['Parada De Inicio'].ubicacion);
      
      // Draw bus route
      const distanciaBus = await drawBusRoute(
        map, 
        data['Parada De Inicio'].ubicacion, 
        data['Parada de destino'].ubicacion, 
        1
      );
      
      distanciaTotal = distanciaInicial + distanciaBus;
      
      // Estimate time (walking 5km/h, bus 25km/h)
      const tiempoCaminando = (distanciaInicial / 1000) / 5 * 60; // Minutes walking
      const tiempoBus = (distanciaBus / 1000) / 25 * 60; // Minutes on bus
      tiempoEstimado = tiempoCaminando + tiempoBus;
      
    } else if (data.tipo === 'Con Transbordo') {
      // Draw walking route to first bus stop
      const distanciaInicial = await drawWalkingRoute(map, userLocation, data['Parada De Inicio'].ubicacion);
      
      // Draw first bus route
      const distanciaBus1 = await drawBusRoute(
        map, 
        data['Parada De Inicio'].ubicacion, 
        data['Parada Intermedia (bajada)'].ubicacion, 
        1
      );
      
      // Draw transfer walking route
      const distanciaTransbordo = await drawTransferRoute(
        map,
        data['Parada Intermedia (bajada)'].ubicacion,
        data['Parada Intermedia (subida)'].ubicacion
      );
      
      // Draw second bus route
      const distanciaBus2 = await drawBusRoute(
        map,
        data['Parada Intermedia (subida)'].ubicacion,
        data['Parada De Destino'].ubicacion,
        2
      );
      
      distanciaTotal = distanciaInicial + distanciaBus1 + distanciaTransbordo + distanciaBus2;
      
      // Estimate time (walking 5km/h, bus 25km/h)
      const tiempoCaminando = ((distanciaInicial + distanciaTransbordo) / 1000) / 5 * 60; // Minutes walking
      const tiempoBus = ((distanciaBus1 + distanciaBus2) / 1000) / 25 * 60; // Minutes on buses
      tiempoEstimado = tiempoCaminando + tiempoBus;
    }
    
    return {
      data,
      distanciaTotal: distanciaTotal / 1000, // Convert to kilometers
      tiempoEstimado: Math.round(tiempoEstimado), // Round to nearest minute
    };
  }).catch((error) => {
    console.error('Error obteniendo ruta:', error);
    return null;
  });
};



//Esto llama a la api de Mapbox y devuelve las direcciones

export const getDirecciones = async (userLat, userLng, stopLat, stopLng, mapboxToken) => {
  try {
    if (!mapboxToken) {
      throw new Error("Se requiere un token de Mapbox para utilizar la API de direcciones");
    }

    // Construir la URL para la API de Mapbox Directions
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${userLng},${userLat};${stopLng},${stopLat}`;
    
    // Parámetros de la solicitud
    const params = {
      alternatives: false,
      geometries: 'geojson',
      overview: 'full',
      steps: true,
      access_token: mapboxToken,
      language: 'es' // Solicitar instrucciones en español
    };

    // Hacer la solicitud a la API de Mapbox
    const response = await axios.get(url, { params });
    
    // Verificar que hay rutas disponibles
    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error("No se encontraron rutas disponibles");
    }

    // Obtener la primera ruta
    const route = response.data.routes[0];
    
    // Extraer los pasos de la ruta
    const pasos = [];
    
    route.legs.forEach(leg => {
      leg.steps.forEach(step => {
        pasos.push({
          instruccion: step.maneuver.instruction,
          distancia: step.distance, // en metros
          duracion: step.duration,  // en segundos
          nombre: step.name || "Sin nombre",
          tipo: step.maneuver.type
        });
      });
    });

    return {
      pasos,
      distanciaTotal: route.distance, // en metros
      duracionTotal: route.duration,  // en segundos
      resumen: route.summary
    };
    
  } catch (error) {
    console.error("Error al obtener direcciones de Mapbox:", error);
    throw new Error(`Error al obtener direcciones: ${error.message}`);
  }
};



export const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return null;
    }
    
    const decodedToken = jwtDecode(token);
    console.log('Decoded token:', decodedToken); // Debug log
    
    // Try to get user ID from various possible properties in the token
    const userId = decodedToken._id || decodedToken.id || decodedToken.userId || decodedToken.sub;
    
    if (!userId) {
      console.error('User ID not found in token. Token structure:', decodedToken);
      return null;
    }
    
    return userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const postViaje = async ({ nombreLugar, destinoLat, destinoLng, lat, lng, precio, tipo, url = "Metro" }) => {
  const userId = getUserIdFromToken();
  
  if (!userId) {
    throw new Error('No hay ID de usuario disponible');
  }
  
  const ahora = new Date();
  const hora = ahora.getHours().toString().padStart(2, '0') + ':' + 
              ahora.getMinutes().toString().padStart(2, '0');
  
  try {
    const response = await axios.post('http://localhost:3001/actividad/add', {
      idUsuario: userId,
      calle: nombreLugar || 'Lugar desconocido',
      fecha: new Date().toISOString(),
      hora: hora,
      precio: precio || 0,
      coordinates: [lng, lat],
      destinoLat: destinoLat,
      destinoLng: destinoLng,
      fotoUrl: url,
      tipo: tipo,
      estado: "Iniciado"
    }, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al guardar el viaje:', error);
    
    // Extraer el mensaje de error de la respuesta si está disponible
    const errorMsg = error.response?.data?.message || error.message || 'Error desconocido al guardar el viaje';
    
    throw new Error(errorMsg);
  }
};


export const getViajes = async () => {
  const userId = getUserIdFromToken();
  
  if (!userId) {
    throw new Error('No hay ID de usuario disponible');
  }
  
  try {
    const response = await axios.get('http://localhost:3001/actividad/:id', {
      params: { idUsuario: userId },
      headers: getAuthHeaders()
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener viajes:', error);
    throw new Error(error.response?.data?.message || error.message || 'Error desconocido al obtener viajes');
  }
};


export const actualizarEstadoViaje = async (actividadId, nuevoEstado) => {
  try {
    const response = await axios.put(`http://localhost:3001/actividad/:${actividadId}`, {
      estado: nuevoEstado
    }, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar estado de viaje a ${nuevoEstado}:`, error);
    throw new Error(error.response?.data?.message || error.message || 'Error desconocido al actualizar estado');
  }
};

// Add this function to your ApiCall.js file
export const getRecentViajes = async (limit = 3) => {
  const userId = getUserIdFromToken();
  
  if (!userId) {
    throw new Error('No hay ID de usuario disponible');
  }
  
  try {
    const response = await axios.get('http://localhost:3001/actividad/:id', {
      params: { 
        idUsuario: userId,
        limit: limit 
      },
      headers: getAuthHeaders()
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener viajes recientes:', error);
    throw new Error(error.response?.data?.message || error.message || 'Error desconocido al obtener viajes recientes');
  }
};

// Alternative approach using the existing getViajes function
export const getRecentTripsFromAll = async (limit = 3) => {
  try {
    // Get all trips
    const allTrips = await getViajes();
    
    // Sort by date (newest first) and slice to get only the most recent ones
    return allTrips
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, limit);
  } catch (error) {
    console.error('Error al obtener viajes recientes:', error);
    throw new Error('Error al obtener viajes recientes: ' + error.message);
  }
};