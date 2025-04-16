import { useState, useEffect } from 'react';
import { CreditCard as CardIcon, Edit as EditIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ModalAñadirMetodoPago from './ModalAñadirMetodoPago';
import { jwtDecode } from 'jwt-decode';
import {
  useBG,
  useText,
  useBGForButtons,
  useBorderColor,
  useTextPrimaryColor,
  usePrimaryColor,
} from '../../ColorClass';
import DeleteMetodos from './DeleteMetodos';

const MetodosPago = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const userId = decodedToken.id;
  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const bgPrimary = useBGForButtons(theme);
  const borderColor = useBorderColor(theme);
  const textPrimary = useTextPrimaryColor(theme);
  const primaryColor = usePrimaryColor(theme);

  const [openModal, setOpenModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    GetCard();
  }, [userId]);

  const GetCard = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/wallet/metodos-pago/${userId}`,
      );

      if (!response.ok) throw new Error('Error al obtener las tarjetas');

      const data = await response.json();

      if (data.metodosPago && Array.isArray(data.metodosPago)) {
        console.log(data.metodosPago);
        setCards(data.metodosPago);
      } else {
        throw new Error('No se encontraron tarjetas o la estructura es incorrecta.');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(error.message);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-4 mb-10">
        <h2 className={` ${textColor} lg:text-3xl text-xl font-bold font-['Inter'] mr-10`}>
          Métodos de Pago
        </h2>
        <button
          className={`relative z-10 p-1 text-xs ${bgPrimary} rounded-[5px] flex items-center justify-center text-white hover:bg-[#5a52c2] transition`}
          onClick={handleOpenModal}>
          <AddIcon className="w-2 h-2 mr-1" />
          Agregar Nuevo
        </button>
      </div>

      {/* Lista de tarjetas */}
      <div className="space-y-4">
        {cards.map((tarjeta) => (
          <div
            key={tarjeta._id}
            className={`flex justify-between items-center 
              ${tarjeta.principal ? `${bgColor} text-white` : `${bgColor} ${textPrimary}`} 
              border ${borderColor} rounded-lg p-2 shadow-lg transition-all`}>
            <div className="flex items-center gap-3">
              {/* Icono de tarjeta antes del nombre */}
              <CardIcon className={`w-6 h-6 ${textPrimary} transition`} />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{tarjeta.Apodo} - 1234</span>
              </div>
            </div>
            <div className="flex gap-4">
              {/* Icono de Editar */}
              <EditIcon
                className={`w-6 h-6 cursor-pointer text-[#6A62DC]"} hover:border-2 hover:rounded-sm transition`}
                titleAccess="Editar"
                sx={{ color: `${primaryColor}` }}
              />

              {/* Icono de Eliminar */}
              <DeleteMetodos
                userId={userId}
                paymentMethodId={tarjeta.paymentMethodId}
                onDeleteSuccess={GetCard} // Función para refrescar la lista
                theme={theme}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar método de pago */}
      <ModalAñadirMetodoPago open={openModal} onClose={handleCloseModal} userId={userId} />
    </div>
  );
};

export default MetodosPago;
