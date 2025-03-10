import React, { useState, useEffect } from "react";

const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

function SelectAutobus() {
  const [autobuses, setAutobuses] = useState([]);
  const [selectedAutobus, setSelectedAutobus] = useState("");

  useEffect(() => {
    const fetchAutobuses = async () => {
      try {
        const response = await fetch(`${API_LINK}/autobus/all`);
        if (!response.ok) {
          console.error("Error al obtener los autobuses:", response.statusText);
          return;
        }
        const data = await response.json();
        setAutobuses(data);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      }
    };

    fetchAutobuses();
  }, []);

  const handleChange = (event) => {
    setSelectedAutobus(event.target.value);
  };

  return (
    <div className="w-[477px] h-[89px] bg-[#eff3fe] rounded-[5px] relative flex items-center px-4">
      <select
        className="
          appearance-none
          w-full
          h-full
          text-[#211f47]
          text-2xl
          font-semibold
          font-['Inter']
          bg-transparent
          px-4
          focus:outline-none
          cursor-pointer
        "
        value={selectedAutobus}
        onChange={handleChange}
      >
        <option value="">Seleccione un autobús</option>
        {autobuses.map((autobus) => (
          <option key={autobus._id} value={autobus._id}>
            {autobus.placa ? autobus.placa : `Autobús ${autobus._id}`}
          </option>
        ))}
      </select>

      {/* Flecha hacia abajo con forma de triángulo */}
      <div
        data-svg-wrapper
        className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div
          className="
            w-0
            h-0
            border-l-[11px]
            border-l-transparent
            border-r-[11px]
            border-r-transparent
            border-t-[19.33px]
            border-t-[#6a62dc]
          "
        />
      </div>
    </div>
  );
}

export default SelectAutobus;
