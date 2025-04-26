import { jwtDecode } from "jwt-decode";
import { useBG, usePrimaryColors, useBGForButtons, useText, useIconColor, useBorderColor } from "../ColorClass";
import NavBar from "../components/NavBar";
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import LocationIcon from "../assets/Home/LocationIcon";
import RefreshIcon from '../assets/Home/RefreshIcon';
import HamburgerMenu from "../components/Home/HamburgerMenu";
import TopBar from '../components/TopBar.jsx';
import { toast } from 'react-toastify';
import MapView from '../components/Map/MapView.jsx';
import useActividadStore from "../components/Map/store/useActividadStore.js";
import { getRecentTripsFromAll } from "../components/Map/utils/ApiCall.js";
import { useNavigate } from 'react-router-dom';

function HomeView() {
    const [openModal, setOpenModal] = useState(false);
    const [locationInput, setLocationInput] = useState("");
    const [locationCoords, setLocationCoords] = useState(null);
    const [destinationInput, setDestinationInput] = useState("");
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [showViajesModal, setViajesShowModal] = useState(false);
    const [viajeObjetivo, setViajeObjetivo] = useState();
    const [isLocating, setIsLocating] = useState(false);
    const { actividades } = useActividadStore();
    const mapboxToken = "pk.eyJ1IjoibmVvZGV2IiwiYSI6ImNtOGQ4ZmIxMzBtc2kybHBzdzNxa3U4eDcifQ.1Oa8lXU045VvFUul26Kwkg";
    const locationInputRef = useRef(null);
    const destinationInputRef = useRef(null);
    
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const theme = decodedToken.theme;
    const bgColor = useBG(theme);
    const PrimaryColor = usePrimaryColors(theme);
    const ButtonColor = useBGForButtons(theme);
    const textColor = useText(theme);
    const iconColor = useIconColor(theme);
    const BorderColor = useBorderColor(theme);
    const [refresh, setRefresh] = useState(false);
    const [recentTrips, setRecentTrips] = useState([]);
    const [isLoadingTrips, setIsLoadingTrips] = useState(false);
    const navigate = useNavigate();
    
    const MySwal = withReactContent(Swal);

    const handleAlert = () => {
        MySwal.fire({
            text: 'Vista en proceso',
            icon: 'error',
            draggable: true,
        });
    };

// Refine the handler to handle different trip data formats consistently
const handleRecentTripClick = (trip) => {
    setViajesShowModal(true);
    setViajeObjetivo(trip);
    
    // Handle different data formats for coordinates
    if (trip.coordenadas) {
      setLocationCoords({
        latitude: trip.coordenadas.latitud || 0,
        longitude: trip.coordenadas.longitud || 0
      });
    }
    
    // Set destination based on available properties (check different possible field names)
    setDestinationInput(trip.calle || trip.viaje || 'Destino sin nombre');
  };
  
  // Then update both sections to use this handler

      // Función para obtener viajes recientes
  const fetchRecentTrips = async () => {
    setIsLoadingTrips(true);
    try {
      const trips = await getRecentTripsFromAll(3);
      setRecentTrips(trips);
    } catch (err) {
      console.error("Error al cargar viajes recientes:", err);
      Toast.error("No se pudieron cargar los viajes recientes");
    } finally {
      setIsLoadingTrips(false);
    }
  };

  // Cargar viajes recientes al montar el componente
  useEffect(() => {
    fetchRecentTrips();
  }, []);

  // Función para actualizar los viajes recientes después de crear uno nuevo
  useEffect(() => {
    // Escuchar el evento personalizado
    const handleActividadActualizada = () => {
      fetchRecentTrips();
    };

    window.addEventListener('actividadActualizada', handleActividadActualizada);

    return () => {
      window.removeEventListener('actividadActualizada', handleActividadActualizada);
    };
  }, []);

    useEffect(() => {
        const handler = () => setRefresh(prev => !prev);
        window.addEventListener("actividadActualizada", handler);
        return () => window.removeEventListener("actividadActualizada", handler);
    }, []);

    const viajesRecientes = actividades.slice((actividades.length - 3));
    viajesRecientes.reverse();

    // Función para obtener sugerencias de ubicación desde Mapbox
    const fetchLocationSuggestions = async (query, setterFunction) => {
        if (!query || query.length < 3) {
            setterFunction([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    query
                )}.json?country=do&access_token=${mapboxToken}&autocomplete=true&language=es`
            );
            const data = await response.json();
            setterFunction(data.features || []);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
            setterFunction([]);
        }
    };

    // Debounce para las búsquedas
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchLocationSuggestions(locationInput, setLocationSuggestions);
        }, 500);
        return () => clearTimeout(timer);
    }, [locationInput]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchLocationSuggestions(destinationInput, setDestinationSuggestions);
        }, 500);
        return () => clearTimeout(timer);
    }, [destinationInput]);

    // Obtener ubicación actual
    const getCurrentLocation = () => {
        setIsLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    try {
                        // Reverse geocoding para obtener la dirección
                        const response = await fetch(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}&language=es`
                        );
                        const data = await response.json();
                        
                        if (data.features && data.features.length > 0) {
                            const locationName = data.features[0].place_name;
                            setLocationInput(locationName);
                            setLocationCoords({ latitude, longitude });
                            setLocationSuggestions([]);
                        }
                    } catch (error) {
                        console.error("Error en geocodificación inversa:", error);
                        toast.error("No se pudo obtener la dirección de tu ubicación actual");
                    }
                    
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error obteniendo la ubicación:", error);
                    toast.error("No se pudo acceder a tu ubicación actual");
                    setIsLocating(false);
                }
            );
        } else {
            toast.error("Tu navegador no soporta geolocalización");
            setIsLocating(false);
        }
    };

    const handleLocationSelect = (suggestion) => {
        setLocationInput(suggestion.place_name);
        setLocationCoords({
            longitude: suggestion.center[0],
            latitude: suggestion.center[1]
        });
        setLocationSuggestions([]);
        
        // Enfocar el campo de destino después de seleccionar ubicación
        if (destinationInputRef.current) {
            destinationInputRef.current.focus();
        }
    };

    const handleDestinationSelect = (suggestion) => {
        setDestinationInput(suggestion.place_name);
        setDestinationCoords({
            longitude: suggestion.center[0],
            latitude: suggestion.center[1]
        });
        setDestinationSuggestions([]);
    };

    const handleSubmit = () => {
        if (!locationInput.trim().length) {
            toast.error(`El campo de ubicación está vacío`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }
        
        if (!destinationInput.trim().length) {
            toast.error(`El campo de destino está vacío`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }

        // Si todo está bien, calcular ruta o lo que necesites
        // Cierra el modal y pasa datos a MapView
        setOpenModal(false);
        // Aquí puedes llamar a la función que maneje tu ruta con los datos locationCoords y destinationCoords
    };

    return (
        <>
            <div className={`flex flex-col items-center p-4 ${bgColor} min-h-screen relative`}>
                <div className="w-full absolute top-0 h-96 bg-cover bg-center z-0" style={{ backgroundImage: "url('src/assets/home/1_2.png')" }}></div>
                <TopBar nombre={'Sitramrd'} mostrarIcono={false} />
                <div className={`flex ${textColor} font-semibold text-4xl w-max h-14">`}>
                    <div className="absolute left-10 top-2">
                        <HamburgerMenu />
                    </div>
                </div>

                <div className={`${ButtonColor} text-white rounded-2xl p-9 shadow-lg mt-12 z-10 w-full max-w-xl bg-opacity-95 backdrop-filter backdrop-blur-sm`}>
                    <p className="font-semibold text-2xl">Daviel Alexander Sanchez</p>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-xl">RD$ 1000.00</p>
                        <button onClick={handleAlert} className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">Recargar</button>
                    </div>
                    <div className="flex justify-between mt-4 text-sm opacity-90">
                        <p>Última recarga: 3/9/2025</p>
                        <p>Último viaje: 2/9/2025 10:25 AM</p>
                    </div>
                </div>

                <div className="mt-32 w-full max-w-2xl">
                    <p className={`${textColor} text-2xl font-semibold mb-3`}>¿Para dónde vas?</p>
                    <div className="flex items-center mb-4">
                        <input 
                            onClick={() => setOpenModal(true)} 
                            type="text" 
                            placeholder="¿A dónde vas?" 
                            className={`w-full p-4 border rounded-lg ${textColor} ${BorderColor} shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`} 
                        />
                    </div>
                    
                    <p className={`${textColor} text-lg font-medium mb-3`}>Viajes recientes</p>
                    <div className="grid grid-cols-1 p-2 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {recentTrips.map((viaje, index) => (
                            <div 
                                key={index}
                                onClick={() => {
                                    // setViajesShowModal(true);
                                    handleRecentTripClick(viaje)
                                }} 
                                className={`w-full flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${textColor} ${BorderColor} bg-opacity-75`}
                            >
                                <RefreshIcon className="flex-shrink-0" color={iconColor} />
                                <div>
                                <p>{viaje.calle}</p>
                                <p></p>
                                    <p className="text-sm opacity-65">Precio: RD$ {viaje.precio?.toFixed(2) || '0.00'}</p>
                                    <p className="text-sm opacity-75">Hora: {viaje.hora}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showViajesModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4 sm:p-6">
                        <div className={`${bgColor} p-6 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col gap-4 border ${BorderColor}`}>
                            <h2 className={`${textColor} text-3xl font-semibold my-4 text-center`}>Detalles del Viaje</h2>

                            {viajeObjetivo && (
                                <div className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className={`${ButtonColor} bg-opacity-10 p-4 rounded-lg`}>
                                            <p className={`${textColor} text-lg font-medium`}>Destino</p>
                                            <p className={`${textColor} text-xl font-semibold`}>{viajeObjetivo.viaje}</p>
                                        </div>
                                        <div className={`${ButtonColor} bg-opacity-10 p-4 rounded-lg`}>
                                            <p className={`${textColor} text-lg font-medium`}>Precio</p>
                                            <p className={`${textColor} text-xl font-semibold`}>{viajeObjetivo.precio}</p>
                                        </div>
                                        <div className={`${ButtonColor} bg-opacity-10 p-4 rounded-lg`}>
                                            <p className={`${textColor} text-lg font-medium`}>Fecha y Hora</p>
                                            <p className={`${textColor}`}>{viajeObjetivo.fecha} - {viajeObjetivo.hora}</p>
                                        </div>
                                        <div className={`${ButtonColor} bg-opacity-10 p-4 rounded-lg`}>
                                            <p className={`${textColor} text-lg font-medium`}>Estado</p>
                                            <p className={`${textColor} font-semibold`}>
                                                <span className={`px-2 py-1 rounded-full text-sm ${viajeObjetivo.estado === 'Completado' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                                                    {viajeObjetivo.estado}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <img src={viajeObjetivo.fotoUrl}/>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between w-full mt-4">
                                <button 
                                    onClick={() => setViajesShowModal(false)} 
                                    className={`${ButtonColor} text-white w-[45%] px-4 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-all font-medium`}
                                >
                                    Cerrar
                                </button>
                                <button 
                                    onClick={() => navigate('/actividad')} 
                                    className={`${ButtonColor} text-white w-[45%] px-4 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-all font-medium`}
                                >
                                    Ver en actividad
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal mejorado */}
                {openModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4 sm:p-6">
                        <div className={`${bgColor} p-6 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col gap-5 border ${BorderColor}`}>
                            <h2 className={`${textColor} text-3xl font-semibold mb-6 text-center`}>Selecciona tu ruta</h2>
                            
                            {/* Contenedor de ubicación actual */}
                            <div className="relative">
                                <div className="flex items-center">
                                    <div className={`absolute left-3 ${textColor}`}>
                                        <LocationIcon color={iconColor} />
                                    </div>
                                    <input
                                        ref={locationInputRef}
                                        type="text"
                                        value={locationInput}
                                        onChange={(e) => setLocationInput(e.target.value)}
                                        placeholder="Tu ubicación actual"
                                        className={`w-full p-4 pl-12 border rounded-lg ${textColor} ${BorderColor} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                                    />
                                    <button 
                                        onClick={getCurrentLocation}
                                        disabled={isLocating}
                                        className={`absolute right-3 ${ButtonColor} text-white p-2 rounded-full hover:opacity-90 transition-all`}
                                    >
                                        {isLocating ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                
                                {/* Sugerencias de ubicación */}
                                {locationSuggestions.length > 0 && (
                                    <div className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${bgColor} ${BorderColor} max-h-60 overflow-y-auto`}>
                                        {locationSuggestions.map((suggestion, index) => (
                                            <div 
                                                key={index}
                                                className={`p-3 hover:bg-gray-100 cursor-pointer ${textColor} border-b ${BorderColor} ${index === locationSuggestions.length - 1 ? 'border-b-0' : ''}`}
                                                onClick={() => handleLocationSelect(suggestion)}
                                            >
                                                {suggestion.place_name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Contenedor de destino */}
                            <div className="relative mt-2">
                                <div className="flex items-center">
                                    <div className={`absolute left-3 ${textColor}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={iconColor}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        ref={destinationInputRef}
                                        type="text"
                                        value={destinationInput}
                                        onChange={(e) => setDestinationInput(e.target.value)}
                                        placeholder="¿A dónde quieres ir?"
                                        className={`w-full p-4 pl-12 border rounded-lg ${textColor} ${BorderColor} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                                    />
                                </div>
                                
                                {/* Sugerencias de destino */}
                                {destinationSuggestions.length > 0 && (
                                    <div className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${bgColor} ${BorderColor} max-h-60 overflow-y-auto`}>
                                        {destinationSuggestions.map((suggestion, index) => (
                                            <div 
                                                key={index}
                                                className={`p-3 hover:bg-gray-100 cursor-pointer ${textColor} border-b ${BorderColor} ${index === destinationSuggestions.length - 1 ? 'border-b-0' : ''}`}
                                                onClick={() => handleDestinationSelect(suggestion)}
                                            >
                                                {suggestion.place_name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Mapa con vista previa de la ruta */}
                            <div className="w-full h-64 rounded-lg overflow-hidden shadow-md mt-4">
                                {locationCoords && destinationCoords ? (
                                    <img 
                                        className="w-full h-full object-cover"
                                        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+f00(${locationCoords.longitude},${locationCoords.latitude}),pin-s+00f(${destinationCoords.longitude},${destinationCoords.latitude})/auto/600x400?access_token=${mapboxToken}`} 
                                        alt="Ruta" 
                                    />
                                ) : (
                                    <img 
                                        className="w-full h-full object-cover"
                                        src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Dominican_Republic_location_map.svg" 
                                        alt="Mapa" 
                                    />
                                )}
                            </div>
                            
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className={`px-6 py-3 rounded-lg border ${BorderColor} ${textColor} hover:bg-gray-100 transition-all font-medium`}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleSubmit} 
                                    className={`${ButtonColor} text-white px-8 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-all font-medium`}
                                >
                                    Buscar ruta
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <MapView 
                        location={locationCoords} 
                        destination={destinationCoords} 
                    />
                </div>
            </div>

            <div className="md:block xl:hidden">
                <NavBar theme={bgColor} />
            </div>
        </>
    );
}

export default HomeView;