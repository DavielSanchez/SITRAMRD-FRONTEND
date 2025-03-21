import React from 'react';

function AuditTableRow({ data }) {
  const { id, nombre, correo, accion, estado } = data;
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{id}</td>
      <td className="px-4 py-2">{nombre}</td>
      <td className="px-4 py-2">{correo}</td>
      <td className="px-4 py-2">{accion}</td>
      <td className="px-4 py-2">{estado}</td>
    </tr>
  );
}

export default AuditTableRow;
