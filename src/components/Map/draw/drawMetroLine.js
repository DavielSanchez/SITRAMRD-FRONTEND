/**
 * Dibuja toda la red de transporte público en el mapa, mostrando todas las líneas simultáneamente
 * @param {Object} map - Instancia del mapa de Mapbox
 * @param {Boolean} showStops - Indica si se deben mostrar las paradas/estaciones
 * @returns {Promise<void>}
 */
const drawTransportNetwork = async (map, showStops = true) => {
  try {
    // Obtener todas las rutas del sistema de transporte
    const response = await fetch('http://localhost:3001/ruta/all');
    const rutas = await response.json();

    if (!rutas || rutas.length === 0) {
      console.error('No se encontraron rutas de transporte disponibles');
      return;
    }

    console.log(`Dibujando red de transporte con ${rutas.length} rutas`);

    // Configuración de colores por tipo y nombre de ruta
    const getRouteColor = (tipo, nombreRuta) => {
      // Colores para Metro
      if (tipo === 'Metro') {
        switch (nombreRuta) {
          case 'L1': return '#0055AA'; // Azul para Línea 1
          case 'L2': return '#DD0000'; // Rojo para Línea 2
          default: return '#6600CC';   // Púrpura para otras líneas de Metro
        }
      }
      // Colores para Teleférico
      else if (tipo === 'Teleferico') {
        return '#FFCC00'; // Amarillo para Teleférico
      }
      // Colores para Corredores (se pueden asignar diferentes colores por nombre)
    };
    
    // Crear una colección GeoJSON para todas las rutas
    const allRoutesGeoJson = {
      type: 'FeatureCollection',
      features: []
    };
    
    // Crear una colección GeoJSON para todas las paradas
    const allStopsGeoJson = {
      type: 'FeatureCollection',
      features: []
    };
    
    // Procesar cada ruta y añadirla a las colecciones
    rutas.forEach(ruta => {
      const color = getRouteColor(ruta.tipo, ruta.nombreRuta);
      
      // Añadir la línea de ruta
      const lineFeature = {
        type: 'Feature',
        id: `route-${ruta.nombreRuta}`,
        properties: {
          name: ruta.nombreRuta,
          type: ruta.tipo,
          fare: ruta.Tarifa,
          color: color,
          dashArray: ruta.tipo === 'Teleferico' ? [2, 1] : [1],
          width: ruta.tipo === 'Metro' ? 4 : (ruta.tipo === 'Teleferico' ? 3 : 2.5)
        },
        geometry: {
          type: 'LineString',
          coordinates: ruta.coordenadas.coordinates || []
        }
      };
      
      allRoutesGeoJson.features.push(lineFeature);
      
      // Añadir las paradas si existen
      if (showStops && ruta.paradas && ruta.paradas.length > 0) {
        ruta.paradas.forEach(parada => {
          const stopFeature = {
            type: 'Feature',
            id: `stop-${ruta.nombreRuta}-${parada.nombre.replace(/\s+/g, '-')}`,
            properties: {
              name: parada.nombre,
              description: parada.descripcion || '',
              order: parada.ubicacion.ordenParada || 0,
              routeName: ruta.nombreRuta,
              routeType: ruta.tipo,
              color: color
            },
            geometry: {
              type: 'Point',
              coordinates: parada.ubicacion.coordinates
            }
          };
          
          allStopsGeoJson.features.push(stopFeature);
        });
      }
    });

    // Añadir fuentes y capas al mapa
    
    // 1. Añadir todas las rutas
    const routesSourceId = 'transport-routes';
    if (map.getSource(routesSourceId)) {
      map.getSource(routesSourceId).setData(allRoutesGeoJson);
    } else {
      map.addSource(routesSourceId, {
        type: 'geojson',
        data: allRoutesGeoJson
      });
      
      // Capa principal para todas las líneas
      map.addLayer({
        id: 'transport-routes-base',
        type: 'line',
        source: routesSourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': 'visible'
        },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': ['get', 'width'],
          'line-opacity': 0.9,
          'line-dasharray': ['get', 'dashArray']
        }
      });
      
      // Contorno/borde para mejorar visibilidad entre líneas que se cruzan
      map.addLayer({
        id: 'transport-routes-outline',
        type: 'line',
        source: routesSourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': 'visible'
        },
        paint: {
          'line-color': '#FFFFFF',
          'line-width': ['+', ['get', 'width'], 2],
          'line-opacity': 0.5,
          'line-gap-width': 0
        },
      }, 'transport-routes-base'); // Coloca el contorno debajo de la línea principal
    }
    
    // 2. Añadir paradas si están habilitadas
    if (showStops) {
      const stopsSourceId = 'transport-stops';
      if (map.getSource(stopsSourceId)) {
        map.getSource(stopsSourceId).setData(allStopsGeoJson);
      } else {
        map.addSource(stopsSourceId, {
          type: 'geojson',
          data: allStopsGeoJson
        });
        
        // Capa para el círculo exterior (blanco) de las paradas
        map.addLayer({
          id: 'transport-stops-outline',
          type: 'circle',
          source: stopsSourceId,
          paint: {
            'circle-radius': 6,
            'circle-color': '#FFFFFF',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000',
            'circle-opacity': 0.9
          }
        });
        
        // Capa para el círculo interior (color según línea) de las paradas
        map.addLayer({
          id: 'transport-stops',
          type: 'circle',
          source: stopsSourceId,
          paint: {
            'circle-radius': 4,
            'circle-color': ['get', 'color'],
            'circle-stroke-width': 0,
            'circle-opacity': 1
          }
        });
        
        // Añadir pop-ups para mostrar información de las paradas
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 10
        });
        
        // Mostrar información al pasar el mouse por encima de las paradas
        map.on('mouseenter', 'transport-stops', (e) => {
          map.getCanvas().style.cursor = 'pointer';
          
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { name, routeName, routeType, description } = e.features[0].properties;
          
          // Contenido HTML del popup
          const htmlContent = `
            <div style="padding: 8px; max-width: 200px;">
              <strong>${name}</strong>
              <div style="font-size: 12px; margin-top: 4px;">
                ${routeName} (${routeType})
              </div>
              ${description ? `<div style="font-size: 11px; margin-top: 4px; color: #666;">${description}</div>` : ''}
            </div>
          `;
          
          popup
            .setLngLat(coordinates)
            .setHTML(htmlContent)
            .addTo(map);
        });
        
        map.on('mouseleave', 'transport-stops', () => {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      }
    }
    
    // Añadir controles para filtrar rutas por tipo
    if (!document.getElementById('transport-filter-control')) {
      const filterControl = document.createElement('div');
      filterControl.id = 'transport-filter-control';
      filterControl.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      filterControl.style.padding = '5px';
      filterControl.style.backgroundColor = 'white';
      filterControl.style.borderRadius = '4px';
      filterControl.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
      
      const transportTypes = ['Metro', 'Teleferico', 'Corredor'];
      
      transportTypes.forEach(tipo => {
        const checkbox = document.createElement('div');
        checkbox.style.display = 'flex';
        checkbox.style.alignItems = 'center';
        checkbox.style.margin = '5px 0';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `filter-${tipo.toLowerCase()}`;
        input.checked = true;
        input.style.marginRight = '5px';
        
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = tipo;
        label.style.fontSize = '12px';
        label.style.userSelect = 'none';
        
        checkbox.appendChild(input);
        checkbox.appendChild(label);
        filterControl.appendChild(checkbox);
        
        // Evento para filtrar rutas
        input.addEventListener('change', function() {
          const filterExpression = ['any'];
          
          transportTypes.forEach(t => {
            const isChecked = document.getElementById(`filter-${t.toLowerCase()}`).checked;
            if (isChecked) {
              filterExpression.push(['==', ['get', 'type'], t]);
            }
          });
          
          map.setFilter('transport-routes-base', filterExpression);
          map.setFilter('transport-routes-outline', filterExpression);
          
          if (showStops) {
            map.setFilter('transport-stops', filterExpression);
            map.setFilter('transport-stops-outline', filterExpression);
          }
        });
      });
      
      map.addControl({
        onAdd: function() {
          return filterControl;
        },
        onRemove: function() {
          filterControl.parentNode.removeChild(filterControl);
        }
      });
    }
    
    console.log('Red de transporte dibujada correctamente');
    
  } catch (err) {
    console.error('Error al dibujar la red de transporte:', err);
  }
};

const highlightRoute = (map, nombreRuta, shouldZoom = true) => {
  if (!map.getSource('transport-routes')) {
    console.error('La red de transporte no está cargada');
    return;
  }
  
  // Aplicar filtro para resaltar solo la ruta seleccionada
  const highlightFilter = ['==', ['get', 'name'], nombreRuta];
  
  // Restaurar todas las rutas pero con menor opacidad
  map.setPaintProperty('transport-routes-base', 'line-opacity', 0.3);
  
  // Crear una nueva capa temporal para la ruta resaltada
  const highlightLayerId = 'highlighted-route';
  
  if (map.getLayer(highlightLayerId)) {
    map.removeLayer(highlightLayerId);
  }
  
  map.addLayer({
    id: highlightLayerId,
    type: 'line',
    source: 'transport-routes',
    filter: highlightFilter,
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': ['get', 'color'],
      'line-width': ['+', ['get', 'width'], 2],
      'line-opacity': 1
    }
  });
  
  // Si se requiere zoom, ajustar la vista a la ruta seleccionada
  if (shouldZoom) {
    // Obtener la feature de la ruta seleccionada
    const features = map.querySourceFeatures('transport-routes', {
      filter: highlightFilter
    });
    
    if (features.length > 0) {
      // Crear un bounds que contenga todas las coordenadas de la ruta
      const coordinates = features[0].geometry.coordinates;
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      
      // Ajustar el mapa para mostrar toda la ruta
      map.fitBounds(bounds, {
        padding: 50,
        duration: 1000
      });
    }
  }
  
  return () => {
    // Función para quitar el resaltado
    if (map.getLayer(highlightLayerId)) {
      map.removeLayer(highlightLayerId);
    }
    map.setPaintProperty('transport-routes-base', 'line-opacity', 0.9);
  };
};

export { drawTransportNetwork, highlightRoute };