import { useState, useEffect } from 'react';

function ActividadLogica() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/actividad/all');
        
        if (!response.ok) {
          throw new Error('Error al cargar las actividades');
        }
        
        const data = await response.json();
        
        const actividadesOrdenadas = data.data.sort((a, b) => 
          new Date(b.fecha) - new Date(a.fecha)
        );
        
        // Aqui se van a tomar solo 10 de la respuesta
        const actividadesRecientes = actividadesOrdenadas.slice(0, 10);
        
        setActividades(actividadesRecientes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);


  if (loading) {
    return <div className="text-center p-4">Cargando actividades...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }

  if (actividades.length === 0) {
    return <div className="text-center p-4">No hay actividades disponibles</div>;
  }

  const actividadMasReciente = actividades[0];
  const restoActividades = actividades.slice(1);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <h2 className="text-xl font-bold bg-blue-600 text-white p-3">Viaje Más Reciente</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img 
              src={actividadMasReciente.fotoUrl || "/api/placeholder/400/300"} 
              alt="Imagen del viaje" 
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="p-4 w-full md:w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Viaje a {actividadMasReciente.calle}</h3>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Fecha:</span> {new Date(actividadMasReciente.fecha).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Hora:</span> {actividadMasReciente.hora}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Precio:</span> RD${actividadMasReciente.precio}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Estado:</span> 
              <span className={`ml-1 font-medium ${
                actividadMasReciente.estado === "Completado" ? "text-green-600" : 
                actividadMasReciente.estado === "Cancelado" ? "text-red-600" : "text-yellow-600"
              }`}>
                {actividadMasReciente.estado}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Lista de los siguientes 9 viajes más recientes */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold bg-gray-700 text-white p-3">Historial de Viajes Recientes</h2>
        <ul className="divide-y divide-gray-200">
          {restoActividades.map((actividad) => (
            <li key={actividad._id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-16 h-16">
                  <img 
                    src={actividad.fotoUrl || "/api/placeholder/64/64"} 
                    alt="Miniatura" 
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      Viaje a {actividad.calle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(actividad.fecha).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex mt-1 justify-between">
                    <p className="text-sm text-gray-500">{actividad.hora}</p>
                    <p className="text-sm font-medium text-gray-900">RD${actividad.precio}</p>
                  </div>
                  <div className="mt-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      actividad.estado === "Completado" ? "bg-green-100 text-green-800" : 
                      actividad.estado === "Cancelado" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {actividad.estado}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActividadLogica;