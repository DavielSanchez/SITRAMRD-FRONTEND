import React from 'react';


function UsuarioInfo({ usuario }) {
    return (
        <div id="info-usuario">
            <h2>Información del Usuario</h2>
            <p>Nombre: {usuario.nombre}</p>
            <p>ID Usuario: {usuario.idUsuario}</p>
            <p>Autobús Asignado: {usuario.autobusAsignado}</p>
        </div>
    );
}

export default UsuarioInfo;