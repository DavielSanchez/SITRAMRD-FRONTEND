import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RouteModal from './modal/RouteModal';
import DirectionModal from './modal/DirectionModal';
import useActividadStore from './store/useActividadStore.js';
import Toast from '../Auth/Toast.jsx';
import { problemaDeRetraso, llegada, busCerca, rutaFinalizada } from './utils/Notifications.js';
import ConfirmationModal from './modal/ConfirmationModal.jsx';
import ubicacion from "../../assets/Map/ubicacion.png";
import { postViaje, getRecentTripsFromAll } from './utils/ApiCall.js';

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
  const [nombreLugar, setNombreLugar] = useState(null);
  const { agregarActividad } = useActividadStore();
  const [isTripStarted, setIsStripStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actividadPendiente, setActividadPendiente] = useState(null);


  // Función para obtener el nombre del lugar
  const obtenerNombreLugar = (lat, lng) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoibmVvZGV2IiwiYSI6ImNtOGQ4ZmIxMzBtc2kybHBzdzNxa3U4eDcifQ.1Oa8lXU045VvFUul26Kwkg`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.features.length > 0) {
          setNombreLugar(data.features[0].text);
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

    // Obtenemos la ubicación del usuario automáticamente al cargar el componente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error al obtener la ubicación inicial:', error);
        }
      );
    }

    return () => {
      if (initialMap) {
        initialMap.remove();
      }
    };
  }, []);

  // Efecto para añadir el marcador de usuario cuando cambia la ubicación
  useEffect(() => {
    if (map && userLocation) {
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
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML('<strong>Tu ubicación</strong>'))
        .addTo(map);

      setActiveMarkers(prev => [...prev.filter(m => !m._element.classList.contains('user-location')), marker]);
    }
  }, [map, userLocation]);

  const startTrip = () => {
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

  const uploadImageFromUrl = async (imageUrl, actividad) => {
    try {
      const formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error al subir imagen desde URL: " + errorText);
      }
  
      const data = await response.json();
      const imagenUrl = data.secure_url;
  
      await guardarActividadEnBaseDeDatos({ ...actividad, imagenUrl });
    } catch (error) {
      console.error("Error subiendo la imagen desde URL:", error);
    }
  };
  
  
  

  
  // Función para guardar la actividad en la base de datos
  const guardarActividadEnBaseDeDatos = async (actividad) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Usar la nueva función de utilidad para guardar el viaje
      const precioNumerico = parseFloat(actividad.precio.replace('RD$ ', '')) || 0;
      
      const viajeData = {
        nombreLugar: actividad.viaje,
        destinoLat: actividad.coordenadas.latitud,
        destinoLng: actividad.coordenadas.longitud,
        lat: userLocation?.latitude || 0,
        lng: userLocation?.longitude || 0,
        precio: precioNumerico,
        url: actividad.imagenUrl
      };
      
      // Llamar a la función de utilidad
      const resultado = await postViaje(viajeData);
      
      console.log('Actividad guardada con éxito:', resultado);
      
      // También actualizar el estado local a través del store
      agregarActividad(actividad);
      
      // Disparar evento para que otros componentes se actualicen
      window.dispatchEvent(new Event("actividadActualizada"));
      
      // Mostrar notificación de éxito
      console.log('Actividad guardada correctamente');
      
      return resultado;
    } catch (error) {
      console.error('Error al guardar la actividad:', error);
      setError(error.message);
      Toast.error(`Error al guardar la actividad: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalConfirm = async () => {
    setConfirmationModal(true);
    if (!userLocation || !destination) {
      console.warn("Faltan datos: ubicación del usuario o destino.");
      Toast.error("Faltan datos para crear la actividad");
      setIsModalOpen(false);
      return;
    }
  
    const nombreDeActividadViaje = nombreLugar || 'Lugar desconocido';
    const precioAleatorio = 35;
  
    const nuevaActividad = {
      viaje: nombreDeActividadViaje,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      precio: `RD$ ${precioAleatorio.toFixed(2)}`,
      estado: 'Iniciado',
      coordenadas: {
        latitud: destinationlat,
        longitud: destinationlng,
      },
    };
    await uploadImageFromUrl(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+000(${nuevaActividad.coordenadas.longitud},${nuevaActividad.coordenadas.latitud})/${nuevaActividad.coordenadas.longitud},${nuevaActividad.coordenadas.latitud},14.20,0,0/600x400?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`,
      nuevaActividad
    );    
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
      <div className="relative">
        {/* Botón posicionado arriba del mapa */}
        <div onClick={handleLocateMe} className="button absolute top-0 left-0 bg-black text-white p-2 m-5 z-10 rounded-full shadow-black shadow-md">
          <img src={ubicacion} alt="" className='size-9'/>
        </div>

        {isTripStarted && (
          <DirectionModal 
            directions={direcciones} 
            latitud={userLocation?.latitude || 0}
            longitud={userLocation?.longitude || 0}
            destinoLat={destination?.lat || 0}
            destinoLng={destination?.lng || 0}
            style="absolute top-0 right-0 mt-5 mr-5 shadow-black bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 max-w-sm z-50"
            onClose={() => {/* Add your close handler here */}}
          />
        )}

        {isModalOpen && destination && (
          <RouteModal
            destination={destination}
            userLocation={userLocation}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
            isLoading={isLoading}
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
          {isConfirmationModalOpen && userLocation && (
            <ConfirmationModal 
              onClose={handleConfirmModalClose}
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
        <button onClick={() => {
          problemaDeRetraso("Hubieron Problemas");
        }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest'>Retraso</button>

        <button onClick={() => {
          llegada();
        }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest '>Llegada</button>

        <button onClick={() => {
          busCerca("5");
        }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest '>Bus Cerca</button>

        <button onClick={() => {
          rutaFinalizada("5");
        }} className='p-5 bg-gray-700/50 text-white font-semibold mt-3 rounded-lg tracking-widest '>Final de viaje</button>
      </div>
    </div>
  );
}

export default MapView;