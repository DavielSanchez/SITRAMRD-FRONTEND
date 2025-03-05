// modals.js
import { useState } from "react";

export const useModalState = () => {
  const [modals, setModals] = useState({
    showColorModal: false,
    showCerrarSesion: false,
    showEditarPerfil: false,
    showIdiomaModal: false,
  });

  const toggleModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return [modals, toggleModal];
};
