import React from "react";
import { useNavigate } from "react-router-dom";
import MiSaldo from "../components/Billetera/MiSaldo"; // Asegúrate de que este componente existe
import NavBar from "../components/NavBar";
import MisTarjetas from "../components/Billetera/MisTarjetas";
import MetodosPago from "../components/Billetera/MetodosPago";
import HistorialRecarga from "../components/Billetera/HistorialRecarga";

const Billetera = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-light)] min-h-screen pb-[80px]">
      {/* Barra Superior */}
      <div className="w-full h-[60px] bg-[var(--bg-light)] flex items-center px-4 shadow-lg border-b border-[var(--color-gray)]">
        <button 
          onClick={() => navigate(-1)} 
          className="text-[#6a62dc] font-bold text-lg"
        >
          ← Volver
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-[#6a62dc]">
          Billetera
        </h1>
      </div>

      {/* Contenido de la Billetera */}
      <div className="p-4">
        <MiSaldo 
          nombre="Daviel Alexander Sanchez"
          numeroTarjeta="7479"
          saldo={1000.00}
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
      
      {/* Barra de Navegación */}
      <NavBar theme="light" />
    </div>
  );
};

export default Billetera;
