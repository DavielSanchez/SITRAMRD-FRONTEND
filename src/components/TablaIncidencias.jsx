import React from 'react';

function TablaIncidencias({ incidencias }) {
    return (
        <div id="tabla-incidencias">
            <h2>Incidencias Reportadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID Usuario</th>
                        <th>ID Autobús</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {incidencias.map(incidencia => (
                        <tr key={incidencia.id}>
                            <td>{incidencia.id}</td>
                            <td>{incidencia.idUsuario}</td>
                            <td>{incidencia.idAutoBus}</td>
                            <td>{incidencia.fecha}</td>
                            <td>{incidencia.estado}</td>
                            <td>{incidencia.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaIncidencias;