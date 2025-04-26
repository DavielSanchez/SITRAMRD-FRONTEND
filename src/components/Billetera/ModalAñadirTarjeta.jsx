import React from 'react';
import { Modal, Backdrop, Fade, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  useBG,
  usePrimaryColors,
  useBGForButtons,
  useText,
  useIconColor,
  useBorderColor,
} from '../../ColorClass';

function ModalAñadirTarjeta({ open, onClose }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const userId = decodedToken.id;

  const bgColor = useBG(theme);
  const PrimaryColor = usePrimaryColors(theme);
  const ButtonColor = useBGForButtons(theme);
  const textColor = useText(theme);
  const BorderColor = useBorderColor(theme);

  const [nombre, setNombre] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState(null);

  const toggleAddCard = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/wallet/tarjetas/virtuales/add`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idUsuario: userId,
            nombre: nombre,
            numeroTarjeta: numeroTarjeta,
          }),
        },
      );

      const cardData = await response.json();

      if (!response.ok) throw new Error(cardData.message || 'Error desconocido');

      // Cerrar el modal
      onClose();

      // Esperar un breve momento antes de recargar la página
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Error en la actualización:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backdropFilter: 'blur(5px)' },
      }}>
      <Fade in={open}>
        <Box
          className={`${bgColor} p-4`}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            maxWidth: '95vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 24,
            borderRadius: 2,
            border: `2px solid ${PrimaryColor}`,
            padding: 3, // Añade un poco más de padding interno
          }}>
          <Typography variant="h6" align="center" fontWeight="bold" className={PrimaryColor}>
            Agregar Tarjeta
          </Typography>

          <Box mt={2}>
            <Typography fontWeight="500" className={textColor}>
              Nombre o Apodo*
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              required
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese nombre o Apodo"
              sx={{
                backgroundColor: theme === 'dark' ? '#333' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme === 'dark' ? '#555' : '#ccc',
                },
                '& .MuiInputBase-input': {
                  color: theme === 'dark' ? '#fff' : '#000',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: theme === 'dark' ? '#bbb' : '#888',
                },
              }}
            />
          </Box>

          <Box mt={2}>
            <Typography fontWeight="500" className={textColor}>
              Numero de tarjeta fisica (opcional)
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              onChange={(e) => setNumeroTarjeta(e.target.value)}
              placeholder="Ingrese numero de la tarjeta fisica"
              sx={{
                backgroundColor: theme === 'dark' ? '#333' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme === 'dark' ? '#555' : '#ccc',
                },
                '& .MuiInputBase-input': {
                  color: theme === 'dark' ? '#fff' : '#000',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: theme === 'dark' ? '#bbb' : '#888',
                },
              }}
            />
          </Box>

          {/* Botones */}
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button
              className={`${ButtonColor} text-white`}
              onClick={toggleAddCard}
              sx={{
                width: '90px',
                height: '35px',
                backgroundColor: '#6a62dc',
                color: 'white',
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: theme === 'dark' ? '#5a52c9' : '#5a52c9', // Hover
                },
              }}>
              Agregar
            </Button>

            <Button
              onClick={onClose}
              sx={{
                width: '90px',
                height: '35px',
                backgroundColor: '#d32f2f', // Rojo para Cancelar
                borderRadius: '5px',
                color: 'white',
                '&:hover': { backgroundColor: '#b71c1c' }, // Hover para Cancelar
              }}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalAñadirTarjeta;
