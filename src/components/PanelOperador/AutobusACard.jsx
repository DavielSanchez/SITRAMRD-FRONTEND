import React, { useState, useEffect } from "react";

function AutobusACard() {
  const [autobuses, setAutobuses] = useState([]);
  // Configuración de API propio para Autobuses Activos
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchAutobuses = async () => {
      try {
        const response = await fetch(`${API_LINK}/autoBus/all`);
        const data = await response.json();
        if (data.autobuses) {
          setAutobuses(data.autobuses);
        }
      } catch (error) {
        console.error("Error fetching autobuses:", error);
      }
    };
    fetchAutobuses();
  }, [API_LINK]);

  return (
    <div className="w-full bg-[#f1f1ff] shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[28px] font-bold text-[#6A62DC] font-['Inter']">
          Autobuses activos
        </h3>
        <span className="text-gray-600 text-xs">
          Total: {autobuses.length}
        </span>
      </div>
      {autobuses.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xs">
            No hay autobuses activos.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default AutobusACard;
