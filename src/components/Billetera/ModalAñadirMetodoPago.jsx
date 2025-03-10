import React, { useState } from "react";
import { Modal, Backdrop, Fade, Box, Typography, TextField, Button } from "@mui/material";

function ModalAñadirMetodoPago({ open, onClose }) {
  const [nombre, setNombre] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

  // Función para manejar el envío de los datos
  const handleSubmit = () => {
    // Aquí puedes hacer la lógica para enviar los datos
    console.log({ nombre, numeroTarjeta, fechaVencimiento, cvv });
    onClose(); // Cerrar el modal después de enviar
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backdropFilter: "blur(5px)" }, // Fondo borroso
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            border: "2px solid #6a62dc", // Borde morado
          }}
        >
          {/* Título en color morado */}
          <Typography variant="h6" align="center" fontWeight="bold" sx={{ color: "#6a62dc" }}>
            Agregar Método de Pago
          </Typography>

          {/* Nombre o Apodo */}
          <Box mt={2}>
            <Typography fontWeight="500">Nombre o Apodo</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ingrese nombre o apodo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Box>

          {/* Número de Tarjeta */}
          <Box mt={2}>
            <Typography fontWeight="500">Número de Tarjeta</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              placeholder="Ingrese número de tarjeta"
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
            />
          </Box>

          {/* Fecha de Vencimiento */}
          <Box mt={2}>
            <Typography fontWeight="500">Fecha de Vencimiento</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="MM/AA"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
            />
          </Box>

          {/* CVV */}
          <Box mt={2}>
            <Typography fontWeight="500">CVV</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              placeholder="Ingrese CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </Box>

          {/* Botones */}
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button
              onClick={onClose}
              sx={{
                width: "90px",
                height: "35px",
                backgroundColor: "#d32f2f", // Rojo para Cancelar
                borderRadius: "10px",
                color: "white",
                "&:hover": { backgroundColor: "#b71c1c" }, // Rojo más oscuro en hover
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                width: "90px",
                height: "35px",
                backgroundColor: "#6a62dc", // Morado para Agregar
                borderRadius: "10px",
                color: "white",
                "&:hover": { backgroundColor: "#5a52c9" }, // Morado más oscuro en hover
              }}
            >
              Agregar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalAñadirMetodoPago;
