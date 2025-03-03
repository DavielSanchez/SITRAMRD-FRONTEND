import React from "react";
import AdminLayout from "./AdminLayout";

export default function GestionOperadores() {
  return (
    <AdminLayout activePage="Gestión O.">
      <div className="transform scale-[0.85] origin-top mx-auto">
        <div className="space-y-6 mt-4 p-4">
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl p-4 flex flex-col justify-center">
              <div className="text-[#6A62DC] text-2xl font-bold">Usuarios Activos</div>
              <div className="text-[#FF5353] text-3xl">12</div>
            </div>
            <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl p-4 flex flex-col justify-center">
              <div className="text-[#6A62DC] text-2xl font-bold">Usuarios Inactivos</div>
              <div className="text-[#FF5353] text-3xl">12</div>
            </div>
            <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl p-4 flex flex-col justify-center">
              <div className="text-[#6A62DC] text-2xl font-bold">Usuarios Activos</div>
              <div className="text-[#FF5353] text-3xl">12</div>
            </div>
          </div>

          {/* Formulario de Usuario */}
          <div className="bg-white rounded-2xl border border-[#6A62DC] p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-[#6A62DC]">Nombre</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label className="text-[#6A62DC]">Apellidos</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Apellidos"
                />
              </div>
              <div>
                <label className="text-[#6A62DC]">Rol</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Rol"
                />
              </div>
              <div>
                <label className="text-[#6A62DC]">Correo</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="Correo"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button className="bg-[#6A62DC] text-white px-4 py-2 rounded">
                Guardar
              </button>
              <button className="bg-[#FF5353] text-white px-4 py-2 rounded">
                Cancelar
              </button>
            </div>
          </div>

          {/* Barra de búsqueda y botón "Agregar Usuario" */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center bg-white rounded-md shadow p-2 w-full md:w-1/3">
              <svg
                className="w-5 h-5 text-[#FF5353]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1111.72 2.222l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar"
                className="ml-2 w-full outline-none"
              />
            </div>
            <button className="bg-[#6A62DC] text-white px-4 py-2 rounded">
              Agregar Usuario
            </button>
          </div>

          {/* Tabla de Información de Usuarios */}
          <div className="overflow-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#6A62DC] text-white">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Last Login</th>
                  <th className="p-2 border">Rol</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-black">
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">Mario Baez</td>
                  <td className="p-2 border">Today</td>
                  <td className="p-2 border">Operador</td>
                  <td className="p-2 border">BaezMa@SITRAMrd.com</td>
                  <td className="p-2 border flex space-x-2 justify-center">
                    <button className="w-6 h-6 border rounded flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#6A62DC]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 13V7h12v6H4z" />
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-[#FF5353] rounded flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 4a1 1 0 00-.894.553l-3 6a1 1 0 001.788.894L10 6.618l2.106 4.829a1 1 0 001.788-.894l-3-6A1 1 0 0010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                {/* Más filas se pueden agregar */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
