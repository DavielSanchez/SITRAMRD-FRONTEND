import React from "react";
import { useNavigate } from "react-router-dom";
import MiSaldo from "../components/Billetera/MiSaldo"; // Asegúrate de que este componente existe
import NavBar from "../components/NavBar";
import MisTarjetas from "../components/Billetera/MisTarjetas";
import MetodosPago from "../components/Billetera/MetodosPago";
import { jwtDecode } from "jwt-decode";
import {
  useBG,
  usePrimaryColors,
  useBGForButtons,
  useText,
  useIconColor,
  useBorderColor,
} from "../ColorClass";
import HistorialRecarga from "../components/Billetera/HistorialRecarga";
import TopBar from "../components/TopBar";
import HamburgerMenu from "../components/Home/HamburgerMenu";
const Billetera = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const bgColor = useBG(theme);
  const PrimaryColor = usePrimaryColors(theme);
  const ButtonColor = useBGForButtons(theme);
  const textColor = useText(theme);
  const iconColor = useIconColor(theme);
  const BorderColor = useBorderColor(theme);

  return (
    <div className={`flex flex-col items-center p-4 ${bgColor} min-h-screen relative`}>
                <div className="w-full absolute top-0 h-96 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/home/1_2.png')" }}></div>
                <TopBar nombre={'Sitramrd'} mostrarIcono={false} />
                <div className={`flex ${textColor} font-semibold text-4xl w-max h-14`}>
                    <div className="absolute left-10 top-2">
                        <HamburgerMenu />
                    </div>
                </div>

      {/* Contenido de la Billetera */}
      <div className="p-4">
        <MiSaldo
          nombre="Daviel Alexander Sanchez"
          numeroTarjeta="7479"
          saldo={1000.0}
          ultimaRecarga="2/9/2025"
          ultimoViaje="2/9/2025 10:25 AM"
        />
      </div>
      <div className="p-4">
        <MisTarjetas />
      </div>

      <div className="p-4">
        <MetodosPago></MetodosPago>
      </div>

      <div className="p-4">
        <HistorialRecarga></HistorialRecarga>
      </div>

      <div className="md:block xl:hidden">
        <NavBar theme={bgColor} />
      </div>
    </div>
  );
};

export default Billetera;
