import { toast } from 'react-toastify';

//toast base maqueta

const opcionesBase = {
  position: "bottom-right",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

//funcion generica para mostrar las notificaciones

const notificar = (tipo = "info", mensaje = "", opcionesPersonalizadas = {}) => {
  return toast[tipo](mensaje, { ...opcionesBase, ...opcionesPersonalizadas });
};

// Notificaciones específicas

export const problemaDeRetraso = () => {
  return notificar("error", "El autobus que tomaste esta experimentando un retraso", {
    autoClose: 10000,
  });
};

export const llegada = (mensaje) => {
  const texto = !mensaje
    ? "Haz llegado a tu parada con éxito"
    : `Haz llegado a tu parada ${mensaje} con éxito, bájate y procede a la próxima de destino`;

  return notificar("success", texto, { autoClose: 10000 });
};

export const busCerca = (minutos) => {
  return notificar("info", `Tu bus está a solo ${minutos} minutos de tu parada de inicio`, {
    autoClose: 7000,
  });
};

export const rutaFinalizada = () => {
  return notificar("success", "Haz completado tu ruta. ¡Buen viaje!", {
    autoClose: 7000,
  });
};
