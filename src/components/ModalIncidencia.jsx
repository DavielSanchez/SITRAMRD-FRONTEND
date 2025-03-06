import React, { useState } from 'react';

function ModalIncidencia({ abierto, cerrarModal, agregarIncidencia }) {
    const [nuevaIncidencia, setNuevaIncidencia] = useState({
        descripcion: '',
        idUsuario: '',
        idAutoBus: '',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente'
    });

    const handleChange = (e) => {
        setNuevaIncidencia({ ...nuevaIncidencia, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarIncidencia({ ...nuevaIncidencia, id: Date.now() }); // Simula un ID único
    };

    if (!abierto) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={cerrarModal}>&times;</span>
                <h2>Crear Nueva Incidencia</h2>
                <form onSubmit={handleSubmit}>
                    <label>Descripción:</label>
                    <textarea name="descripcion" value={nuevaIncidencia.descripcion} onChange={handleChange} required />
                    <label>ID Usuario:</label>
                    <input type="text" name="idUsuario" value={nuevaIncidencia.idUsuario} onChange={handleChange} required />
                    <label>ID Autobús:</label>
                    <input type="text" name="idAutoBus" value={nuevaIncidencia.idAutoBus} onChange={handleChange} required />
                    <label>Fecha de Reporte:</label>
                    <input type="date" name="fecha" value={nuevaIncidencia.fecha} onChange={handleChange} required />
                    <label>Estado:</label>
                    <select name="estado" value={nuevaIncidencia.estado} onChange={handleChange}>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Resuelto">Resuelto</option>
                    </select>
                    <button type="submit">Guardar Incidencia</button>
                </form>
            </div>
        </div>
    );
}

export default ModalIncidencia;