import React from "react";
import { Modal, Backdrop, Fade, Box, Typography, TextField, Button } from "@mui/material";

function ModalAñadirTarjeta({ open, onClose }) {
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
            Agregar Tarjeta
          </Typography>

          {/* Nombre o método de pago */}
          <Box mt={2}>
            <Typography fontWeight="500">Nombre o Método de Pago</Typography>
            <TextField fullWidth variant="outlined" placeholder="Ingrese nombre o método de pago" />
          </Box>

          {/* Número de tarjeta */}
          <Box mt={2}>
            <Typography fontWeight="500">Número de Tarjeta</Typography>
            <TextField fullWidth variant="outlined" type="number" placeholder="Ingrese número de tarjeta" />
          </Box>

          {/* Código PIN */}
          <Box mt={2}>
            <Typography fontWeight="500">Código PIN</Typography>
            <TextField fullWidth variant="outlined" type="password" placeholder="Ingrese código PIN" />
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
              sx={{
                width: "90px",
                height: "35px",
                backgroundColor: "#6a62dc", // Morado para Continuar
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

export default ModalAñadirTarjeta;
