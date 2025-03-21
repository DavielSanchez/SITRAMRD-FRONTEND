import React from 'react';

function RoutesMapCard() {
  return (
    <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl shadow-md p-2 md:h-80 overflow-hidden">
      <h2 className="text-[#6A62DC] text-xl font-bold mb-2">Rutas</h2>
      <img
        className="w-full h-full rounded-xl object-cover"
        src="https://placehold.co/663x422"
        alt="Mapa de Rutas"
      />
    </div>
  );
}

export default RoutesMapCard;
