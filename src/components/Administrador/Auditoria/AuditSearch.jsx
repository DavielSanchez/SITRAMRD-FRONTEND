import React from 'react';

function AuditSearch() {
  return (
    <div className="mb-6">
      <div className="relative p-4 border border-[#6a62dc] rounded-md bg-white">
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div>
            <label className="block text-[#6a62dc] text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingrese nombre"
              className="w-full h-10 pl-3 pr-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#6a62dc] text-sm font-medium mb-1">
              Correo
            </label>
            <input
              type="text"
              placeholder="Ingrese correo"
              className="w-full h-10 pl-3 pr-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#6a62dc] text-sm font-medium mb-1">
              Filtrar por acción
            </label>
            <input
              type="text"
              placeholder="Filtrar por acción"
              className="w-full h-10 pl-3 pr-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
        {/* Botón en la esquina inferior derecha */}
        <div className="absolute bottom-4 right-4">
          <button className="w-40 h-10 bg-[#6a62dc] text-white rounded-lg border border-[#6a62dc]">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuditSearch;
