import Swal from 'sweetalert2';
import { Delete as TrashIcon } from '@mui/icons-material';
import { usePrimaryColor } from '../../ColorClass';

function DeleteMetodos({ userId, paymentMethodId, onDeleteSuccess, theme }) {
  const primaryColor = usePrimaryColor(theme);

  const handleDeletePaymentMethod = async () => {
    if (!userId || !paymentMethodId) {
      Swal.fire('Error', 'Faltan datos para eliminar el método de pago', 'error');
      return;
    }

    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6A62DC',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/wallet/eliminar-metodo-pago`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, paymentMethodId }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire('Eliminado', 'El método de pago ha sido eliminado', 'success');
        if (onDeleteSuccess) onDeleteSuccess(); // Refrescar la lista de métodos de pago
      } else {
        Swal.fire('Error', data.error || 'No se pudo eliminar el método de pago', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un problema al conectar con el servidor', 'error');
    }
  };

  return (
    <TrashIcon
      className="w-6 h-6 cursor-pointer text-[#6A62DC] hover:border-2 hover:rounded-sm transition"
      titleAccess="Eliminar"
      onClick={handleDeletePaymentMethod}
      sx={{ color: `${primaryColor}` }}
    />
  );
}

export default DeleteMetodos;
