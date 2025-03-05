import React, { useState, useEffect } from "react";

function Rutas() {
  const [rutas, setRutas] = useState([]);
  // Configuración de API propio para las rutas asignadas
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(`${API_LINK}/ruta/all`);
        const data = await response.json();
        if (data.rutas) {
          setRutas(data.rutas);
        }
      } catch (error) {
        console.error("Error fetching rutas:", error);
      }
    };
    fetchRutas();
  }, [API_LINK]);

  function RutasIcon() {
    return (
      <svg
        width="40"
        height="31"
        viewBox="0 0 40 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 24.8462C6 25.9478 6.42143 27.0044 7.17157 27.7834C7.92172 28.5624 8.93913 29 10 29C11.0609 29 12.0783 28.5624 12.8284 27.7834C13.5786 27.0044 14 25.9478 14 24.8462M6 24.8462C6 23.7445 6.42143 22.6879 7.17157 21.9089C7.92172 21.1299 8.93913 20.6923 10 20.6923C11.0609 20.6923 12.0783 21.1299 12.8284 21.9089C13.5786 22.6879 14 23.7445 14 24.8462M6 24.8462V24.8462C3.79086 24.8462 2 23.0553 2 20.8462V12.3846M14 24.8462H26M26 24.8462C26 25.9478 26.4214 27.0044 27.1716 27.7834C27.9217 28.5624 28.9391 29 30 29C31.0609 29 32.0783 28.5624 32.8284 27.7834C33.5786 27.0044 34 25.9478 34 24.8462M26 24.8462C26 23.7445 26.4214 22.6879 27.1716 21.9089C27.9217 21.1299 28.9391 20.6923 30 20.6923C31.0609 20.6923 32.0783 21.1299 32.8284 21.9089C33.5786 22.6879 34 23.7445 34 24.8462M34 24.8462V24.8462C36.2091 24.8462 38 23.0553 38 20.8462V16.5385C38 15.4368 37.5786 14.3802 36.8284 13.6012C36.0783 12.8223 35.0609 12.3846 34 12.3846H32M2 12.3846L3.53267 8.40558C5.01929 4.54608 8.72844 2 12.8643 2H19.0804C22.1826 2 25.1091 3.43972 27.0023 5.89722L32 12.3846M2 12.3846H32M20 12.3846V2"
          stroke="#6A62DC"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className="w-full bg-[#f1f1ff] shadow-md rounded-lg px-4 py-3 flex flex-row items-center gap-3">
      <div className="flex-shrink-0">
        <RutasIcon />
      </div>
      <div className="flex flex-col">
        <span className="text-[#6A62DC] font-semibold text-sm">
          Rutas asignadas:
        </span>
        <span className="text-red-500 text-2xl font-bold">
          {rutas.length}
        </span>
      </div>
    </div>
  );
}

export default Rutas;
