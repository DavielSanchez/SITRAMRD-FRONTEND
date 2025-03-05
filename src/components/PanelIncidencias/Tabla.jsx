import React, { useState, useEffect } from "react";

function Tabla() {
  const [incidencias, setIncidencias] = useState([]);
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch(`${API_LINK}/incidencia/all`);
        const data = await response.json();
        if (data.incidencias) {
          setIncidencias(data.incidencias);
        }
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };
    fetchIncidencias();
  }, [API_LINK]);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-[#6a62dc] text-white">
            <th className="px-4 py-2 text-center">#</th>
            <th className="px-4 py-2 text-center">Autobús</th>
            <th className="px-4 py-2 text-center">Descripción</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {incidencias.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                No hay incidencias registradas.
              </td>
            </tr>
          ) : (
            incidencias.map((inc, index) => (
              <tr key={inc._id} className="border-b">
                <td className="px-4 py-2 text-center text-[#6a62dc] font-semibold">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-center">
                  {inc.idAutoBus ? inc.idAutoBus : "N/A"}
                </td>
                <td className="px-4 py-2 text-center">{inc.descripcion}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-end w-full gap-2">
                    {/* Ícono de editar */}
                    <div data-svg-wrapper className="cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M10.5 2.82861L14.5 6.82861M1 16.3284H5L15.5 5.82843C15.7626 5.56578 15.971 5.25398 16.1131 4.91082C16.2553 4.56766 16.3284 4.19986 16.3284 3.82843C16.3284 3.45699 16.2553 3.0892 16.1131 2.74604C15.971 2.40287 15.7626 2.09107 15.5 1.82843C15.2374 1.56578 14.9256 1.35744 14.5824 1.2153C14.2392 1.07316 13.8714 1 13.5 1C13.1286 1 12.7608 1.07316 12.4176 1.2153C12.0744 1.35744 11.7626 1.56578 11.5 1.82843L1 12.3284V16.3284Z"
                          stroke="#6A62DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Ícono de eliminar */}
                    <div data-svg-wrapper className="cursor-pointer">
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                        <path
                          d="M17 5H1M16 5L15 17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17L2 5M12 5V2C12 1.73478 11.8946 1.48043 11.7071 1.29289C11.5196 1.10536 11.2652 1 11 1H7C6.73478 1 6.48043 1.10536 6.29289 1.29289C6.10536 1.48043 6 1.73478 6 2V5M11 10L7 14M7 10L11 14"
                          stroke="#FF1414"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
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
