import { useState, useEffect } from 'react';
import { useBGForButtons, useIconColor, useTextPrimaryColor } from '../../ColorClass';
import { jwtDecode } from 'jwt-decode';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CircularProgress from '@mui/material/CircularProgress';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

function BloquearTarjetaSecundaria({ tarjetaId, principal, estadoUsuario }) {
  const [estado, setEstado] = useState(estadoUsuario); // Inicializar con estadoUsuario
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const theme = decodedToken.theme;
  const ButtonColor = useBGForButtons(theme);
  const iconColor = useIconColor(theme);
  const textPrimary = useTextPrimaryColor(theme);

  const MySwal = withReactContent(Swal);

  const toggleTarjeta = async () => {
    const isDarkTheme = theme === 'dark';

    const confirmResult = await MySwal.fire({
      title: estado === 'Activa' ? '¿Bloquear tarjeta?' : '¿Desbloquear tarjeta?',
      text:
        estado === 'Activa'
          ? 'La tarjeta será bloqueada y no podrá usarse hasta ser desbloqueada.'
          : 'La tarjeta volverá a estar activa y disponible para su uso.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isDarkTheme ? '#5c55c7' : '#5c55c7',
      cancelButtonColor: isDarkTheme ? '#df4747' : '#df4747',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      background: isDarkTheme ? '#000000' : '#ffffff',
      color: isDarkTheme ? '#fff' : '#161616',
    });

    if (!confirmResult.isConfirmed) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/wallet/bloquear-tarjeta/${tarjetaId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (response.ok) {
        const nuevoEstado = estado === 'Activa' ? 'Inactiva' : 'Activa';
        setEstado(nuevoEstado); // Actualizar estado

        await MySwal.fire({
          title: nuevoEstado === 'Activa' ? 'Tarjeta desbloqueada' : 'Tarjeta bloqueada',
          text:
            nuevoEstado === 'Activa'
              ? 'La tarjeta ahora está activa y lista para usarse.'
              : 'La tarjeta ha sido bloqueada con éxito.',
          icon: 'success',
          confirmButtonColor: isDarkTheme ? '#6a62dc' : '#6a62dc',
          background: isDarkTheme ? '#000000' : '#ffffff',
          color: isDarkTheme ? '#fff' : '#161616',
        });
        window.location.reload();
      } else {
        throw new Error('Error al cambiar el estado de la tarjeta.');
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la tarjeta:', error);

      await MySwal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el estado de la tarjeta. Inténtalo nuevamente.',
        icon: 'error',
        confirmButtonColor: isDarkTheme ? '#df4747' : '#5c55c7',
        background: isDarkTheme ? '#000000' : '#ffffff',
        color: isDarkTheme ? '#fff' : '#161616',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : estado === 'Activa' ? (
        <LockOpenIcon
          className={`w-6 h-6 cursor-pointer ${
            principal ? `${ButtonColor} text-white` : `${textPrimary}`
          } hover:border-2 hover:rounded-sm transition`}
          titleAccess="Bloquear"
          onClick={toggleTarjeta}
        />
      ) : (
        <LockIcon
          className={`w-6 h-6 cursor-pointer ${
            principal ? `${ButtonColor} text-white` : `${textPrimary}`
          } hover:border-2 hover:rounded-sm transition`}
          titleAccess="Desbloquear"
          onClick={toggleTarjeta}
        />
      )}
    </>
  );
}

export default BloquearTarjetaSecundaria;
