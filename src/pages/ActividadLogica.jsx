import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode';
import { useBG, useText, useBGForButtons, useBorderColor, usePrimaryColors } from '../ColorClass';
import TopBar from '../components/TopBar';
import HamburgerMenu from '../components/Home/HamburgerMenu';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RefreshIcon from '@mui/icons-material/Refresh'; // Agregado icono de reinicio

function Actividad() {
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

  // Función para manejar el reinicio (puedes añadir la lógica que necesites)
  const handleReset = () => {
    // Aquí puedes implementar la lógica de reinicio
    console.log('Reinicio solicitado');
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
          <ForkLeftIcon sx={{ color: `${primaryColor}` }} /> {/* Actualizado para usar color primario */}

          <div className="ml-4">
            <p className={`${textColor} text-md font-normal`}>Viaje a {actividadMasReciente.calle}</p>
            <p className={`${textColor} text-md font-normal`}>
              {new Date(actividadMasReciente.fecha).toLocaleDateString()} • {actividadMasReciente.hora}
            </p>
          </div>

          <div className="ml-auto flex flex-row items-center gap-3 rounded"> {/* Cambiado a flex-row para alinear horizontalmente */}
            <RemoveRedEyeIcon
              sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
              onClick={toggleMainImageVisibility}
            />
            <RefreshIcon 
              sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
              onClick={handleReset}
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
                <DirectionsBusIcon sx={{ color: `${primaryColor}` }} /> {/* Actualizado para usar color primario */}

                <div className="flex flex-col flex-grow ml-4">
                  <span className={`${textColor} text-md font-normal font-['Inter']`}>
                    Viaje a {actividad.calle}
                  </span>
                  <span className={`${textColor} text-md font-normal font-['Inter']`}>
                    {new Date(actividad.fecha).toLocaleDateString()} • {actividad.hora}
                  </span>
                </div>

                <div className="ml-auto flex flex-row items-center gap-3 rounded"> {/* Cambiado a flex-row para alinear horizontalmente */}
                  <RemoveRedEyeIcon
                    sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
                    onClick={() => toggleImageVisibility(actividad._id)}
                  />
                  <RefreshIcon 
                    sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
                    onClick={() => handleReset(actividad._id)}
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