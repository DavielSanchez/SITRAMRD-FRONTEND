import React from 'react';
import { Delete } from '@mui/icons-material';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import {
  useBGForButtons,
  useIconColor,
  usePrimaryColor,
  useTextPrimaryColor,
} from '../../ColorClass';

function DeleteCard({ principal, cardId, theme }) {
  const MySwal = withReactContent(Swal);

  const ButtonColor = useBGForButtons(theme);
  const iconColor = useIconColor(theme);
  const primaryColor = usePrimaryColor(theme);
  const textPrimary = useTextPrimaryColor(theme);

  const deleteCard = async () => {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#6a62dc',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_LINK}/wallet/tarjeta/virtual/delete/${cardId}`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Error al eliminar la tarjeta');

        MySwal.fire({
          title: '¡Eliminado!',
          text: 'La tarjeta ha sido eliminada con éxito.',
          icon: 'success',
          background: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          confirmButtonColor: '#6a62dc',
        });

        setTimeout(() => window.location.reload(), 100);
      } catch (error) {
        console.error('Error al eliminar la tarjeta:', error);
        MySwal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la tarjeta.',
          icon: 'error',
          background: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          confirmButtonColor: '#6a62dc',
        });
      }
    }
  };
  return (
    <>
      <Delete
        onClick={deleteCard}
        className={`w-6 h-6 cursor-pointer ${
          principal ? `${ButtonColor} text-white` : `${textPrimary}`
        } hover:border-2 hover:rounded-sm transition`}
        titleAccess="Eliminar"
      />
    </>
  );
}

export default DeleteCard;
