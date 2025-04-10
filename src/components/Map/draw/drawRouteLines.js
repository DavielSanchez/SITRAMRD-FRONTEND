const drawRouteLines = async (map, userLocation, destination) => {
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation.longitude},${userLocation.latitude};${destination.lng},${destination.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
  
    try {
      const response = await fetch(directionsUrl);
      const data = await response.json();
      const route = data.routes[0].geometry;
  
      if (map.getSource('route')) {
        map.getSource('route').setData({
          type: 'Feature',
          geometry: route
        });
      } else {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route
          }
        });
  
        map.addLayer({
          id: 'route-layer',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#888',
            'line-width': 4
          }
        });
      }
    } catch (error) {
      console.error('Error dibujando ruta:', error);
    }
  };
  
  export default drawRouteLines;
  