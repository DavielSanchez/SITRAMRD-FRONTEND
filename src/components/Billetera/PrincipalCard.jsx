import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useBGForButtons, useBGForSecondaryButtons, useBG } from '../../ColorClass';
import dayjs from 'dayjs';
import QrCodeIcon from '@mui/icons-material/QrCode';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import BloquearTarjeta from './BloquearTarjeta';
import ModalRecargarBalance from './ModalRecargarBalance';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PaymentQr from './PaymentQr';
import { Link } from 'react-router-dom';

function PrincipalCard() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const userId = decodedToken.id;
  console.log(decodedToken);
  const ButtonColor = useBGForButtons(theme);
  const bgColor = useBG(theme);
  const SecondaryButtonColor = useBGForSecondaryButtons(theme);

  const [cardBalance, setCardBalance] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(null);
  const [ultimaRecarga, setUltimaRecarga] = useState('No hay registros');
  const [ultimoPago, setUltimoPago] = useState('No hay registros');
  const [cardId, setCardId] = useState('');
  const [cardStatus, setCardStatus] = useState('');
  const [modalRecargarOpen, setModalRecargarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleAlert = () => {
    MySwal.fire({
      text: 'Vista en preceso',
      icon: 'error',
      draggable: true,
    });
  };

  const formatDate = (date) => {
    return dayjs(date).format('D/M/YYYY h:mm A');
  };

  useEffect(() => {
    GetCard();
  }, [userId]);

  const GetCard = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/wallet/user/tarjetas/virtuales/${userId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      
      if (!text) {
        throw new Error('Respuesta vacía del servidor');
      }
      
      const data = JSON.parse(text);
      
      if (!data || data.length === 0) {
        throw new Error('No se recibió un Client Secret válido.');
      }
      const principalCard = data.find((card) => card.principal === true);
      if (principalCard) {
        console.log('Tarjeta principal:', principalCard);
        setCardBalance(principalCard.saldo);
        setCardNumber(principalCard.numeroTarjeta);
        setCardName(principalCard.nombre);
        setCardId(principalCard._id);
        setCardStatus(principalCard.estadoUsuario);

        const recargas = await fetch(
          `${import.meta.env.VITE_API_LINK}/wallet/recarga/tarjeta/${principalCard._id}`,
        );
        if (!recargas.ok) {
          throw new Error('Error al obtener las recargas');
        }
        const pagos = await fetch(
          `${import.meta.env.VITE_API_LINK}/wallet/pagos/tarjeta/${principalCard._id}`,
        );
        if (!pagos.ok) {
          throw new Error('Error al obtener los pagos');
        }
        const recargasText = await recargas.text();
        const pagosText = await pagos.text();

        let recargasData = [];
        let pagosData = [];

        try {
          recargasData = recargasText ? JSON.parse(recargasText) : [];
        } catch (err) {
          console.error("Error parseando recargas:", err);
        }

        try {
          pagosData = pagosText ? JSON.parse(pagosText) : [];
        } catch (err) {
          console.error("Error parseando pagos:", err);
        }

        const ultimoPagos = pagosData.length ? pagosData[pagosData.length - 1] : null;
        const ultimaRecargas = recargasData.length ? recargasData[recargasData.length - 1] : null;

        // Verifica si hay datos antes de usarlos
        if (!ultimoPagos || !ultimaRecargas) {
          console.warn("No se encontraron pagos o recargas recientes.");
}


        if (ultimoPagos) {
          setUltimoPago(ultimoPagos.fecha);
        }

        if (ultimaRecargas) {
          console.log(ultimaRecargas.fecha);
          setUltimaRecarga(ultimaRecargas.fecha);
        }
      } else {
        console.log('No se encontró tarjeta principal.');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const formatCardNumber = (number, visible) => {
    if (!number) return '';

    let prefix = '';
    let digits = number;

    if (number.startsWith('V-')) {
      prefix = 'V-';
      digits = number.slice(2);
    }

    if (!visible) {
      let maskedGroups = '*'
        .repeat(digits.length - 4)
        .padEnd(digits.length - 4, '*')
        .replace(/(.{4})/g, '$1 ')
        .trim();

      return prefix + maskedGroups + ' ' + digits.slice(-4);
    }

    return prefix + digits.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <>
      {cardName ? (
        <div
          className={`${ButtonColor} text-white rounded-2xl shadow-lg mt-15 z-10 w-full max-w-xl p-4 sm:p-6`}>
          <div
            className={`${ButtonColor} rounded-2xl p-1 sm:p-1 flex flex-col space-y-1 sm:space-y-2`}>
            <h2 className="text-lg sm:text-2xl font-bold">{cardName}</h2>

            {/* <p className="text-xs sm:text-sm tracking-widest">{formatCardNumber(cardNumber)}</p> */}
            <div className="flex gap-2">
              <p className="text-xs sm:text-sm tracking-widest">
                {formatCardNumber(cardNumber, isVisible)}
              </p>
              {isVisible ? (
                <Visibility onClick={() => setIsVisible(!isVisible)} />
              ) : (
                <VisibilityOff onClick={() => setIsVisible(!isVisible)} />
              )}
            </div>

            <p className="text-xl sm:text-3xl font-bold">
              {' '}
              RD${' '}
              {cardBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
            </p>

            <div className="text-xs sm:text-sm">
              <p>Última recarga: {formatDate(ultimaRecarga)}</p>
              <p>Último viaje: {formatDate(ultimoPago)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`bg-[#6a62dc] text-white text-center rounded-2xl shadow-lg mt-35 z-10 w-full max-w-xl p-4 sm:p-6`}>
          <h2 className=" text-3xl font-bold">Aun no hay una tarjeta registrada</h2>
        </div>
      )}
      {cardName ? (
        <div className={`mt-1 z-10 w-full max-w-xl`}>
          <div className="flex gap-3 justify-start mt-4">
            <button
              onClick={() => setModalRecargarOpen(true)}
              className={`${SecondaryButtonColor}  text-white px-6 z-10 py-2 rounded-lg shadow cursor-pointer sm:text-lg`}>
              Recargar Balance
            </button>
            <PaymentQr tarjetaId={cardId} />
            <BloquearTarjeta tarjetaId={cardId} estadoUsuario={cardStatus} />
          </div>
        </div>
      ) : (
        <div className={`mt-1 mb-10 z-10 w-full max-w-xl`}>
          <div className="flex gap-3 justify-center mt-4">
            <Link
              to={'/billetera'}
              className={`${SecondaryButtonColor}  text-white px-6 z-10 py-2 rounded-lg shadow cursor-pointer sm:text-lg`}>
              Ir a registrar una tarjeta
            </Link>
          </div>
        </div>
      )}

      <ModalRecargarBalance
        open={modalRecargarOpen}
        onClose={() => setModalRecargarOpen(false)}
        tarjetaId={cardId}
      />
    </>
  );
}

export default PrincipalCard;
