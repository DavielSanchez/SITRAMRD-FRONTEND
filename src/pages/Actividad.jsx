import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode';
import { useBG, useText } from '../ColorClass';
import TopBar from '../components/TopBar';
import HamburgerMenu from '../components/Home/HamburgerMenu';
import HistorialViajes from '../components/Actividad/HistorialViajes';
import LastViaje from '../components/Actividad/LastViaje';

function Actividad() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const bgColor = useBG(theme);
  const textColor = useText(theme);

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
          <LastViaje theme={theme} />
        </div>
        <HistorialViajes theme={theme} />
      </div>
      <div className="block md:hidden z-20">
        <NavBar theme={bgColor} />
      </div>
    </div>
  );
}

export default Actividad;
