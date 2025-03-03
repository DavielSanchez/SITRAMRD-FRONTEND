import React from "react";
import AdminLayout from "./AdminLayout";

export default function Auditoria() {
  return (
    <AdminLayout activePage="Auditoria">
      <div className="bg-white p-4">
        {/* Sección de filtros */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="flex flex-col">
              <label className="text-[#6a62dc] text-base font-normal font-['Inter']">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre"
                className="border border-[#6a62dc] rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#6a62dc] text-base font-normal font-['Inter']">
                Correo
              </label>
              <input
                type="text"
                placeholder="Buscar por correo"
                className="border border-[#6a62dc] rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#6a62dc] text-base font-normal font-['Inter']">
                Filtrar por acción
              </label>
              <input
                type="text"
                placeholder="Acción"
                className="border border-[#6a62dc] rounded-md p-2"
              />
            </div>
          </div>
          <button className="bg-[#6a62dc] text-white px-4 py-2 rounded">
            Buscar
          </button>
        </div>

        {/* Sección de tabla */}
        <div className="overflow-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#6a62dc] text-white">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Acción</th>
                <th className="p-2 border">Estado</th>
              </tr>
            </thead>
            <tbody className="text-black text-base font-normal font-['Inter']">
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">Mario Baez</td>
                <td className="p-2 border">Inicio de Sesión</td>
                <td className="p-2 border">Éxito</td>
              </tr>
              <tr>
                <td className="p-2 border">2</td>
                <td className="p-2 border">Luis Perez</td>
                <td className="p-2 border">Modificación de Usuario</td>
                <td className="p-2 border">Fallido</td>
              </tr>
              <tr>
                <td className="p-2 border">3</td>
                <td className="p-2 border">Jose Segura</td>
                <td className="p-2 border">Eliminación de Registro</td>
                <td className="p-2 border">Pendiente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
