import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioInfo from '../components/UsuarioInfo';
import TablaIncidencias from '../components/TablaIncidencias';
import ModalIncidencia from '../components/ModalIncidencia';

function DashboardPage() {
    const [usuario, setUsuario] = useState(null);
    const [incidencias, setIncidencias] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const usuarioResponse = await axios.get('/api/usuario');
                setUsuario(usuarioResponse.data);

                const incidenciasResponse = await axios.get('/api/incidencias');
                setIncidencias(incidenciasResponse.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        cargarDatos();
    }, []);

    const abrirModal = () => {
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    const agregarIncidencia = async (nuevaIncidencia) => {
        try {
            const response = await axios.post('/api/incidencias', nuevaIncidencia);
            setIncidencias([...incidencias, response.data]);
            cerrarModal();
        } catch (error) {
            console.error('Error al crear incidencia:', error);
        }
    };

    return (
        <div className="container">
            <h1>Dashboard Chofer</h1>
            {usuario && <UsuarioInfo usuario={usuario} />}
            <button onClick={abrirModal}>Crear Incidencia</button>
           
            <ModalIncidencia abierto={modalAbierto} cerrarModal={cerrarModal} agregarIncidencia={agregarIncidencia} />
        </div>
    );
}

export default DashboardPage;