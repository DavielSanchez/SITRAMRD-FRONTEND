import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RouteModal from './modal/RouteModal';
import DirectionModal from './modal/DirectionModal';
import actividad from './utils/actividad';
import useActividadStore from './store/useActividadStore.js';

function MapView() {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationlat, setDestinationLat] = useState(null);
  const [destinationlng, setDestinationLng] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMarkers, setActiveMarkers] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [nombreLugar, setNombreLugar] = useState(null);  // Nuevo estado para el nombre del lugar
  const { agregarActividad } = useActividadStore();

  // Función para obtener el nombre del lugar
  const obtenerNombreLugar = (lat, lng) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoibmVvZGV2IiwiYSI6ImNtOGQ4ZmIxMzBtc2kybHBzdzNxa3U4eDcifQ.1Oa8lXU045VvFUul26Kwkg`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.features.length > 0) {
          setNombreLugar(data.features[0].text);  // Guardamos el nombre del lugar en el estado
        }
      })
      .catch(error => console.error('Error al obtener el nombre del lugar:', error));
  };

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVvZGV2IiwiYSI6ImNtOGQ4ZmIxMzBtc2kybHBzdzNxa3U4eDcifQ.1Oa8lXU045VvFUul26Kwkg';

    const initialMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-69.93504763767407, 18.479794498094996],
      zoom: 12,
    });

    setMap(initialMap);

    initialMap.on('click', (e) => {
      setDestination(e.lngLat);
      setDestinationLng(e.lngLat.lng);
      setDestinationLat(e.lngLat.lat);
      setIsModalOpen(true);

      // Llamar a la función de geocoding para obtener el nombre del lugar
      obtenerNombreLugar(e.lngLat.lat, e.lngLat.lng);
    });

    return () => {
      if (initialMap) {
        initialMap.remove();
      }
    };
  }, []);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          if (map) {
            map.flyTo({
              center: [longitude, latitude],
              zoom: 14,
            });

            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('Geolocalización no está soportada en este navegador.');
    }
  };

  const handleModalConfirm = () => {
    if (!userLocation || !destination) {
      console.warn("Faltan datos: ubicación del usuario o destino.");
      setIsModalOpen(false);
      return;
    }

    // Usar el nombre del lugar en la actividad
    const nombreDeActividadViaje = nombreLugar || 'Lugar desconocido';

    // Agregar actividad si todo está bien
    agregarActividad({
      viaje: `${nombreDeActividadViaje}`,
      fecha: '2025-09-03',
      hora: '10:25 AM',
      precio: 'RD$ 75.00',
      estado: 'Pendiente',
      coordenadas: {
        latitud: destinationlat,
        longitud: destinationlng,
      },
    });

    window.dispatchEvent(new Event("actividadActualizada")); // 🟢 Emitir evento

    // Limpiar estados
    activeMarkers.forEach((marker) => marker.remove());
    setActiveMarkers([]);
    setDirecciones([]);
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleLocateMe} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 80 }}>
        Localízame
      </button>

      <button style={{ position: 'absolute', top: '10px', left: '150px', zIndex: 80 }}>Mostrar rutas de autobús</button>

      <button style={{ position: 'absolute', top: '10px', left: '400px', zIndex: 80 }}>Mostrar rutas de metro</button>

      <DirectionModal directions={direcciones} />

      {isModalOpen && destination && (
        <RouteModal
          destination={destination}
          userLocation={userLocation}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}


      <div ref={mapContainerRef} style={{ width: '70vw', height: '80vh' }} />
    </div>
  );
}

export default MapView;
