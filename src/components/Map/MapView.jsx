import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RouteModal from './modal/RouteModal';
import DirectionModal from './modal/DirectionModal';
import useActividadStore from './store/useActividadStore.js';
import Toast from '../Auth/Toast.jsx';
import { problemaDeRetraso, llegada, busCerca, rutaFinalizada } from './utils/Notifications.js';
import ConfirmationModal from './modal/ConfirmationModal.jsx';
import ubicacion from "../../assets/Map/ubicacion.png"

function MapView() {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationlat, setDestinationLat] = useState(null);
  const [destinationlng, setDestinationLng] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModal] = useState(false);
  const [activeMarkers, setActiveMarkers] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [nombreLugar, setNombreLugar] = useState(null);  // Nuevo estado para el nombre del lugar
  const { agregarActividad } = useActividadStore();
  const [isTripStarted, setIsStripStarted] = useState(false);

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
      setConfirmationModal(false);

      // Llamar a la función de geocoding para obtener el nombre del lugar
      obtenerNombreLugar(e.lngLat.lat, e.lngLat.lng);
    });

    return () => {
      if (initialMap) {
        initialMap.remove();
      }
    };
  }, []);

  const startTrip = () =>{
    setIsStripStarted(true);
  }

  // Función para manejar la ubicación del usuario
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

            // Limpiar marcadores anteriores de ubicación
            activeMarkers.forEach(marker => {
              if (marker._element.classList.contains('user-location')) {
                marker.remove();
              }
            });

            // Crear elemento para el marcador de usuario
            const el = document.createElement('div');
            el.className = 'marker user-location';
            el.style.backgroundColor = '#3498db';
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.borderRadius = '50%';
            el.style.border = '3px solid white';
            el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

            // Añadir nuevo marcador de usuario
            const marker = new mapboxgl.Marker(el)
              .setLngLat([longitude, latitude])
              .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML('<strong>Tu ubicación</strong>'))
              .addTo(map);

            setActiveMarkers(prev => [...prev, marker]);
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
    setConfirmationModal(true);
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
    setDirecciones([]);
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModalClose = () => {
    setConfirmationModal(false);
  };

  return (
    <div>

      <button style={{ position: 'absolute', top: '10px', left: '150px', zIndex: 80 }}>Mostrar rutas de autobús</button>

      <button style={{ position: 'absolute', top: '10px', left: '400px', zIndex: 80 }}>Mostrar rutas de metro</button>

     

      


<div className="duv relative">
  {/* Botón posicionado arriba del mapa */}
  <div onClick={handleLocateMe} className="button absolute top-0 left-0 bg-black text-white p-2 m-5 z-10 rounded-full shadow-black shadow-md">
    <img src={ubicacion} alt="" className='size-9'/>
  </div>


    {isTripStarted && (
        <DirectionModal 
        directions={direcciones} 
        latitud={userLocation?.latitude || 0}
        longitud={userLocation?.longitude || 0}
        destinoLat={destination?.lat || 0}  // Changed from destination?.latitude
        destinoLng={destination?.lng || 0}  // Changed from destination?.longitude
        style="absolute top-0 right-0 mt-5 mr-5 shadow-black bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 max-w-sm z-50"
        onClose={() => {/* Add your close handler here */}}
      />
    )}


    {isModalOpen && destination &&  (
        <RouteModal
          destination={destination}
          userLocation={userLocation}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}



  {/* Mapa */}
  <div
    ref={mapContainerRef}
    style={{
      width: '70vw',
      height: '80vh',
    }}
  />
  <div className="button absolute bottom-0 left-0 w-full z-20">
  {isConfirmationModalOpen && (
        <ConfirmationModal onClose={handleConfirmModalClose}
        lat={userLocation.latitude}
        lng={userLocation.longitude}
        destinoLat={destinationlat}
        destinoLng={destinationlng}
        start={startTrip}
        map={map}
        />
      )}
  </div>
</div>

      
      <h3 className='text-xl font-semibold mt-5'>Notificaciones de prueba del usuario</h3>

      <div className="flex gap-5">
      <button onClick={() =>{
        problemaDeRetraso("Hubieron Problemas");
      }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest'>Retraso</button>

      <button onClick={() =>{
        llegada();
      }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest '>Llegada</button>

      <button onClick={() =>{
        busCerca("5");
      }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest '>Bus Cerca</button>

      <button onClick={() =>{
        rutaFinalizada("5");
      }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest '>Final de viaje</button>
      </div>


      <Toast/>
    </div>
  );
}

export default MapView;
