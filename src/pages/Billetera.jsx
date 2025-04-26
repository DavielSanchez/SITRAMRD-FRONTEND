import NavBar from '../components/NavBar';
import MisTarjetas from '../components/Billetera/MisTarjetas';
import MetodosPago from '../components/Billetera/MetodosPago';
import { jwtDecode } from 'jwt-decode';
import { useBG, useText } from '../ColorClass';
import HistorialRecarga from '../components/Billetera/HistorialRecarga';
import TopBar from '../components/TopBar';
import HamburgerMenu from '../components/Home/HamburgerMenu';
import PrincipalCard from '../components/Billetera/PrincipalCard';

const Billetera = () => {
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
      <TopBar nombre={'Billetera'} mostrarIcono={false} />
      <div className={`flex ${textColor} font-semibold text-4xl w-max`}>
        <div className="absolute left-10 z-49">
          <HamburgerMenu />
        </div>
      </div>

      <PrincipalCard />

      <div className="mt-10 mb-10 w-full max-w-4xl">
        <MisTarjetas />
        <MetodosPago />
      </div>

      <HistorialRecarga />
      <div className="block md:hidden z-20">
        <NavBar theme={bgColor} />
      </div>
    </div>
  );
};

export default Billetera;
