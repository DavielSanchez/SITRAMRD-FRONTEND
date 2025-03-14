import React from "react";

const TablaUsuarios = ({ usuarios, loading }) => {
  return (
    <div className="overflow-auto p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#6A62DC] text-white rounded-t-2xl border-b border-gray-300">
            <th className="p-3 rounded-tl-2xl text-left">#</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Último Login</th>
            <th className="p-3 text-left">Rol</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 rounded-tr-2xl text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="border-b border-gray-300">
              <td colSpan="6" className="text-center p-4">
                Cargando usuarios...
              </td>
            </tr>
          ) : (
            usuarios.map((user, index) => (
              <tr key={user._id} className="text-black border-b border-gray-300">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.nombre}</td>
                <td className="p-3">{user.lastLogin || "No disponible"}</td>
                <td className="p-3">{user.userRol}</td>
                <td className="p-3">{user.correo}</td>
                <td className="p-3 flex justify-center space-x-2">
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
