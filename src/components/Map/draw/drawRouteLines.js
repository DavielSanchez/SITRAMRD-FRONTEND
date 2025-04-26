import mapboxgl from 'mapbox-gl';
import axios from 'axios';

// Funcion para dibujar diferentes rutas y segmentos especificos
const drawRouteLines = async (map, userLocation, destination) => {
  // Verificar que map existe y esta listo
  if (!map || !map.loaded()) {
    console.error('El mapa no está listo en drawRouteLines');
    return;
  }

  try {
    // agregar marcador de usuario por si no existe
    if (!map.getSource('user-point')) {
      map.addSource('user-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [userLocation.longitude, userLocation.latitude]
          }
        }
      });
      
      map.addLayer({
        id: 'user-marker',
        type: 'circle',
        source: 'user-point',
        paint: {
          'circle-radius': 8,
          'circle-color': '#3887be',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });
    }
    
    // Agregar destino de usuario por si no existe
    if (!map.getSource('destination-point')) {
      map.addSource('destination-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [destination.lng, destination.lat]
          }
        }
      });
      
      map.addLayer({
        id: 'destination-marker',
        type: 'circle',
        source: 'destination-point',
        paint: {
          'circle-radius': 8,
          'circle-color': '#f30',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });
    }
  } catch (error) {
    console.error('Error dibujando marcadores:', error);
  }
};

// funcion para dibujar ruta de caminado hacia la primera linea de autobus
const drawWalkingRoute = async (map, userLocation, firstStopLocation) => {
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation.longitude},${userLocation.latitude};${firstStopLocation.longitud},${firstStopLocation.latitud}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

  try {
    const response = await fetch(directionsUrl);
    const data = await response.json();
    const route = data.routes[0].geometry;

    if (map.getSource('walking-route')) {
      map.getSource('walking-route').setData({
        type: 'Feature',
        geometry: route
      });
    } else {
      map.addSource('walking-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      });

      map.addLayer({
        id: 'walking-route-layer',
        type: 'line',
        source: 'walking-route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be', // Color azul para caminar
          'line-width': 4,
          'line-dasharray': [2, 1] // Lineas con espacio
        }
      });
    }

    // Primera parada de bus
    addStopMarker(map, firstStopLocation, 'first-stop', '#00aa00');
    
    return data.routes[0].distance; // Retorna distancia en metros
  } catch (error) {
    console.error('Error dibujando ruta caminando:', error);
    return 0;
  }
};

// Dibuja entre las paradas de la ruta
const drawBusRoute = async (map, startStop, endStop, routeId) => {
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startStop.longitud},${startStop.latitud};${endStop.longitud},${endStop.latitud}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

  try {
    const response = await fetch(directionsUrl);
    const data = await response.json();
    const route = data.routes[0].geometry;

    if (map.getSource(`bus-route-${routeId}`)) {
      map.getSource(`bus-route-${routeId}`).setData({
        type: 'Feature',
        geometry: route
      });
    } else {
      map.addSource(`bus-route-${routeId}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      });

      map.addLayer({
        id: `bus-route-layer-${routeId}`,
        type: 'line',
        source: `bus-route-${routeId}`,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': routeId === 1 ? '#FF8C00' : '#00aa00', // Naranja para la primera ruta, verde para la segunda
          'line-width': 5
        }
      });
    }
    
    addStopMarker(map, endStop, `stop-${routeId}-end`, '#FF8C00');
    
    return data.routes[0].distance; // retorna la distancia en metros
  } catch (error) {
    console.error(`Error dibujando ruta de bus ${routeId}:`, error);
    return 0;
  }
};

// Dibuja rutas con transbordo
const drawTransferRoute = async (map, firstBusEndStop, secondBusStartStop) => {
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${firstBusEndStop.longitud},${firstBusEndStop.latitud};${secondBusStartStop.longitud},${secondBusStartStop.latitud}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

  try {
    const response = await fetch(directionsUrl);
    const data = await response.json();
    const route = data.routes[0].geometry;

    if (map.getSource('transfer-route')) {
      map.getSource('transfer-route').setData({
        type: 'Feature',
        geometry: route
      });
    } else {
      map.addSource('transfer-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      });

      map.addLayer({
        id: 'transfer-route-layer',
        type: 'line',
        source: 'transfer-route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#8B008B', // Purpura para la caminata con transbordo
          'line-width': 4,
          'line-dasharray': [2, 1] // Linea con espaciados
        }
      });
    }
    
    // Segundo marcador de parada de autobus
    addStopMarker(map, secondBusStartStop, 'second-start-stop', '#00aa00');
    
    return data.routes[0].distance; // retorna distancia en metros
  } catch (error) {
    console.error('Error dibujando ruta de transbordo:', error);
    return 0;
  }
};

// agregar parada de autobus al mapa
const addStopMarker = (map, stopLocation, id, color) => {
  if (!map.getSource(`${id}-point`)) {
    map.addSource(`${id}-point`, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {
          description: stopLocation.Parada || 'Parada de bus'
        },
        geometry: {
          type: 'Point',
          coordinates: [stopLocation.longitud, stopLocation.latitud]
        }
      }
    });
    
    map.addLayer({
      id: `${id}-marker`,
      type: 'circle',
      source: `${id}-point`,
      paint: {
        'circle-radius': 6,
        'circle-color': color,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });
  }
};

// Funcion para limpiar todo
const clearAllRoutes = (map) => {
  const layerIds = [
    'walking-route-layer', 
    'bus-route-layer-1', 
    'bus-route-layer-2', 
    'transfer-route-layer', 
    'user-marker', 
    'destination-marker',
    'first-stop-marker',
    'stop-1-end-marker',
    'second-start-stop-marker',
    'stop-2-end-marker'
  ];
  
  const sourceIds = [
    'walking-route', 
    'bus-route-1', 
    'bus-route-2', 
    'transfer-route', 
    'user-point', 
    'destination-point',
    'first-stop-point',
    'stop-1-end-point',
    'second-start-stop-point',
    'stop-2-end-point'
  ];
  
  // Remueve las capas
  layerIds.forEach(id => {
    if (map.getLayer(id)) {
      map.removeLayer(id);
    }
  });
  
  // Remueve todos los puntos
  sourceIds.forEach(id => {
    if (map.getSource(id)) {
      map.removeSource(id);
    }
  });
};

const drawMetroRoute = async (map, metroStops) => {
  if (!map || !map.loaded()) {
    console.error('El mapa no está listo en drawMetroRoute');
    return;
  }

  if (metroStops.length < 2) {
    console.error('Se necesitan al menos dos paradas para dibujar una ruta');
    return;
  }

  let fullRouteCoordinates = [];

  for (let i = 0; i < metroStops.length - 1; i++) {
    const start = metroStops[i];
    const end = metroStops[i + 1];

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitud},${start.latitud};${end.longitud},${end.latitud}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(directionsUrl);
      const data = await response.json();
      const segmentCoordinates = data.routes[0].geometry.coordinates;

      // Agregar al arreglo general (sin repetir el último punto de cada segmento)
      if (i === 0) {
        fullRouteCoordinates.push(...segmentCoordinates);
      } else {
        fullRouteCoordinates.push(...segmentCoordinates.slice(1));
      }

    } catch (error) {
      console.error('Error obteniendo direcciones entre paradas:', error);
    }
  }

  // Agregar la fuente y capa de la ruta completa
  if (!map.getSource('metro-route')) {
    map.addSource('metro-route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: fullRouteCoordinates
        }
      }
    });

    map.addLayer({
      id: 'metro-route-layer',
      type: 'line',
      source: 'metro-route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#000000', // Negro estilo mapa
        'line-width': 6
      }
    });
  } else {
    map.getSource('metro-route').setData({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: fullRouteCoordinates
      }
    });
  }

  // Dibujar las paradas
  metroStops.forEach((stop, index) => {
    addStopMarker(map, stop, `metro-stop-${index}`, '#000000');
  });
};


export { drawWalkingRoute, drawBusRoute, drawTransferRoute, clearAllRoutes, drawMetroRoute };
export default drawRouteLines;