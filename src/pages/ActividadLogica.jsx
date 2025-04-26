import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode';
import { useBG, useText, useBGForButtons, useBorderColor, usePrimaryColors } from '../ColorClass';
import TopBar from '../components/TopBar';
import HamburgerMenu from '../components/Home/HamburgerMenu';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RefreshIcon from '@mui/icons-material/Refresh';
import { reiniciarViaje } from '../components/Map/utils/Events';

function Actividad() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const bgPrimary = useBGForButtons(theme);
  const borderColor = useBorderColor(theme);
  const primaryColor = usePrimaryColors(theme);
  
  const [isMainImageVisible, setIsMainImageVisible] = useState(true);
  const [visibleImages, setVisibleImages] = useState({});
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMainImageVisibility = () => {
    setIsMainImageVisible(!isMainImageVisible);
  };

  const toggleImageVisibility = (id) => {
    setVisibleImages({
      ...visibleImages,
      [id]: !visibleImages[id]
    });
  };

  // Function to handle trip reset
  const handleReset = async (actividad) => {
    console.log("Activity selected for reset:", JSON.stringify(actividad, null, 2));
    
    // Clear any existing trip
    reiniciarViaje();
    
    // Get origin coordinates properly
    let origen;
    
    try {
      // Try to get current position using a Promise-based approach
      origen = await getCurrentPosition();
      console.log("Successfully obtained current position:", origen);
    } catch (error) {
      console.error("Error getting location:", error);
      // Use default coordinates if geolocation fails
      origen = { lat: 18.479794498094996, lng: -69.93504763767407 }; // Default Santo Domingo coordinates
      console.log("Using default coordinates:", origen);
    }
    
    // Extract destination coordinates from activity data
    let destino = extractDestinationCoordinates(actividad);
    
    // Proceed with trip configuration using the obtained coordinates
    configurarYGuardarViaje(origen, destino, actividad);
  };

  // Helper function to get current position as a Promise
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  // Helper function to extract destination coordinates from activity data
  const extractDestinationCoordinates = (actividad) => {
    let destino = { lat: 0, lng: 0 };
    
    // Check all possible coordinate locations in the activity object
    if (actividad.destinoLat !== undefined && actividad.destinoLng !== undefined) {
      destino.lat = parseFloat(actividad.destinoLat);
      destino.lng = parseFloat(actividad.destinoLng);
    } else if (actividad.coordenadas) {
      if (typeof actividad.coordenadas === 'object') {
        // Handle object with latitud/longitud properties
        destino.lat = parseFloat(actividad.coordenadas.latitud || 0);
        destino.lng = parseFloat(actividad.coordenadas.longitud || 0);
      } else if (Array.isArray(actividad.coordenadas) && actividad.coordenadas.length >= 2) {
        // Handle array format [lng, lat]
        destino.lng = parseFloat(actividad.coordenadas[0]);
        destino.lat = parseFloat(actividad.coordenadas[1]);
      }
    } else if (actividad.latitud !== undefined && actividad.longitud !== undefined) {
      destino.lat = parseFloat(actividad.latitud);
      destino.lng = parseFloat(actividad.longitud);
    } else if (actividad.calle_latitud !== undefined && actividad.calle_longitud !== undefined) {
      destino.lat = parseFloat(actividad.calle_latitud);
      destino.lng = parseFloat(actividad.calle_longitud);
    }
    
    // Log for debugging
    console.log("Extracted coordinates:", destino);
    
    return destino;
  };

  // Helper function to configure and save trip data
  const configurarYGuardarViaje = (origen, destino, actividad) => {
    // Verify that we have valid destination coordinates
    if (destino.lat === 0 && destino.lng === 0) {
      console.error("Could not obtain valid destination coordinates from:", actividad);
      alert("No se pudieron obtener las coordenadas del destino");
      return;
    }
    
    console.log("Trip data to save:", {
      origen: origen,
      destino: destino
    });
    
    // Save basic data in localStorage for the new trip
    localStorage.setItem('viaje_origen', JSON.stringify(origen));
    localStorage.setItem('viaje_destino', JSON.stringify(destino));
    localStorage.setItem('viaje_estado', 'activo');
    localStorage.setItem('viaje_tiempo_inicio', Date.now().toString());
    localStorage.setItem('viaje_ultimo_paso', 'inicio');
    
    // Save additional information that might be useful
    localStorage.setItem('viaje_destino_nombre', actividad.calle || actividad.nombreLugar || 'Destino');
    
    // Redirect user to the map
    navigate('/homeview');
  };

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/actividad/all');
        
        if (!response.ok) {
          throw new Error('Error al cargar las actividades');
        }
        
        const data = await response.json();
        
        const actividadesOrdenadas = data.data.sort((a, b) => 
          new Date(b.fecha) - new Date(a.fecha)
        );
        
        // Examinar la estructura de datos para depuración
        if (actividadesOrdenadas.length > 0) {
          console.log("Estructura de una actividad:", actividadesOrdenadas[0]);
        }
        
        // Aqui se van a tomar solo 10 de la respuesta
        const actividadesRecientes = actividadesOrdenadas.slice(0, 10);
        
        setActividades(actividadesRecientes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);

  const renderLastViaje = () => {
    if (loading) {
      return <div className="text-center p-4">Cargando actividades...</div>;
    }

    if (error) {
      return <div className="text-center p-4 text-red-600">Error: {error}</div>;
    }

    if (actividades.length === 0) {
      return <div className="text-center p-4">No hay actividades disponibles</div>;
    }

    const actividadMasReciente = actividades[0];

    return (
      <div className="w-full mt-2 mb-5 sm:px-40">
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isMainImageVisible ? 'h-[193px] opacity-100 scale-y-100' : 'h-0 opacity-0 scale-y-0'
          }`}>
          <img
            className={`w-full h-[193px] border ${borderColor} object-cover rounded-t-md`}
            src={actividadMasReciente.fotoUrl || "https://placehold.co/388x193"}
            alt="Destino"
          />
        </div>

        <div
          className={`bottom-0 left-0 w-full h-15 ${bgColor} shadow-md border ${borderColor} flex items-center px-6 transition-all duration-300 ease-in-out ${
            isMainImageVisible ? 'rounded-b-md' : 'rounded-md'
          }`}>
          <ForkLeftIcon sx={{ color: `${primaryColor}` }} />

          <div className="ml-4">
            <p className={`${textColor} text-md font-normal`}>Viaje a {actividadMasReciente.calle}</p>
            <p className={`${textColor} text-md font-normal`}>
              {new Date(actividadMasReciente.fecha).toLocaleDateString()} • {actividadMasReciente.hora}
            </p>
          </div>

          <div className="ml-auto flex flex-row items-center gap-3 rounded">
            <RemoveRedEyeIcon
              sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
              onClick={toggleMainImageVisibility}
            />
            <RefreshIcon 
              sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
              onClick={() => handleReset(actividadMasReciente)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderHistorialViajes = () => {
    if (loading || error || actividades.length === 0) {
      return null;
    }

    const restoActividades = actividades.slice(1);

    return (
      <>
        <div className="flex justify-start w-full mt-5 sm:px-40">
          <p className={`${textColor} font-medium text-3xl`}>Historial de viajes</p>
        </div>
        <div className="flex justify-start w-full mt-2 mb-5 sm:px-40">
          <div className="w-[173px] h-[18px] relative">
            <div className={`w-[60px] h-4 left-0 top-[1px] absolute ${bgPrimary} rounded-[3px]`} />
            <div className="left-[1px] top-0 absolute justify-start text-white text-sm font-normal font-['Inter']">
              1/1/2001
            </div>
            <div
              className={`left-[64px] top-0 absolute justify-start ${textColor} text-sm font-normal font-['Inter']`}>
              hasta
            </div>
            <div
              className={`w-[65px] h-4 left-[108px] top-[2px] absolute ${bgPrimary} rounded-[3px]`}
            />
            <div className="left-[110px] top-[1px] absolute justify-start text-white text-sm font-normal font-['Inter']">
              2/2/2002
            </div>
          </div>
        </div>
        <div className="w-full mt-2 mb-5 sm:px-40">
          {restoActividades.map((actividad) => (
            <div key={actividad._id} className="w-full">
              {/* Contenedor de la imagen con animación */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  visibleImages[actividad._id] ? 'h-[193px] opacity-100 scale-y-100' : 'h-0 opacity-0 scale-y-0'
                }`}>
                <img
                  className={`w-full h-[193px] border ${borderColor} object-cover rounded-t-md`}
                  src={actividad.fotoUrl || "https://placehold.co/388x193"}
                  alt="Destino"
                />
              </div>

              <div
                className={`w-full h-15 relative mb-2 flex items-center ${bgColor} shadow-md border ${borderColor} px-6 transition-all duration-300 ease-in-out ${
                  visibleImages[actividad._id] ? 'rounded-b-md' : 'rounded-md'
                }`}>
                <DirectionsBusIcon sx={{ color: `${primaryColor}` }} />

                <div className="flex flex-col flex-grow ml-4">
                  <span className={`${textColor} text-md font-normal font-['Inter']`}>
                    Viaje a {actividad.calle}
                  </span>
                  <span className={`${textColor} text-md font-normal font-['Inter']`}>
                    {new Date(actividad.fecha).toLocaleDateString()} • {actividad.hora}
                  </span>
                </div>

                <div className="ml-auto flex flex-row items-center gap-3 rounded">
                  <RemoveRedEyeIcon
                    sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
                    onClick={() => toggleImageVisibility(actividad._id)}
                  />
                  <RefreshIcon 
                    sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
                    onClick={() => handleReset(actividad)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={`flex flex-col items-center px-5 ${bgColor} min-h-screen relative`}>
      <div
        className="w-full absolute top-0 h-96 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('src/assets/home/1_2.png')" }}></div>
      <TopBar nombre={'Actividad'} mostrarIcono={false} />
      <div className={`flex ${textColor} font-semibold text-4xl w-max`}>
        <div className="absolute left-10 z-49">
          <HamburgerMenu />
        </div>
      </div>
      <div className="mt-15 mb-5 z-10 w-full max-w-4xl">
        <div className="flex justify-start w-full mt-5 sm:px-40">
          <p className={`${textColor} font-medium text-3xl`}>Ultimo viaje</p>
        </div>
        <div className="flex justify-center w-full">
          {renderLastViaje()}
        </div>
        {renderHistorialViajes()}
      </div>
      <div className="block md:hidden z-20">
        <NavBar theme={bgColor} />
      </div>
    </div>
  );
}

export default Actividad;