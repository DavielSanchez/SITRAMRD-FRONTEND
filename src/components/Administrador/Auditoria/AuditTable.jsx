import React from 'react';
import AuditTableRow from './AuditTableRow';

const auditData = [
  {
    id: 1,
    nombre: 'Mario Baez',
    correo: 'BaezMa@SITRAMrd.com',
    accion: 'Inicio de Sesión',
    estado: 'Éxito'
  },
  {
    id: 2,
    nombre: 'Luis Perez',
    correo: 'PerezLu@SITRAMrd.com',
    accion: 'Modificación de Usuario',
    estado: 'Fallido'
  },
  {
    id: 3,
    nombre: 'Jose Segura',
    correo: 'SeguraJo@STRAMrd.com',
    accion: 'Eliminación de Registro',
    estado: 'Pendiente'
  }
];

function AuditTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-[#6a62dc]">
        <thead className="bg-[#6a62dc] text-white">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Acción</th>
            <th className="px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody className="bg-white text-black">
          {auditData.map((item) => (
            <AuditTableRow key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTable;
