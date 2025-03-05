import React, { useState, useEffect } from "react";

function Tabla() {
  const [rutas, setRutas] = useState([]);
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(`${API_LINK}/ruta/all`);
        const data = await response.json();
        // Suponiendo que el endpoint devuelve un arreglo en data.rutas
        if (data.rutas) {
          setRutas(data.rutas);
        }
      } catch (error) {
        console.error("Error fetching rutas:", error);
      }
    };

    fetchRutas();
  }, [API_LINK]);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-[#6a62dc] text-white">
            <th className="px-4 py-2 text-center">#</th>
            <th className="px-4 py-2 text-center">Autobús</th>
            <th className="px-4 py-2 text-center">Ruta</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {rutas.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                No hay rutas registradas.
              </td>
            </tr>
          ) : (
            rutas.map((ruta, index) => (
              <tr key={ruta._id || index} className="border-b">
                <td className="px-4 py-2 text-center text-[#6a62dc] font-semibold">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-center">
                  {/* Conectar la API de autobuses cuando esté disponible */}
                  {"Autobús no disponible"}
                </td>
                <td className="px-4 py-2 text-center">
                  {ruta.nombre || "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;