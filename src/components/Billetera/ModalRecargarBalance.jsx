import React from "react";
import { Modal, Backdrop, Fade, Box, Typography, TextField, MenuItem, Button } from "@mui/material";

function ModalRecargarBalance({ open, onClose }) {
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
            Recargar Balance
          </Typography>

          {/* Monto a recargar */}
          <Box mt={2}>
            <Typography fontWeight="500">Monto a recargar</Typography>
            <TextField fullWidth type="number" placeholder="Ingrese el monto" variant="outlined" />
          </Box>

          {/* Método de pago */}
          <Box mt={2}>
            <Typography fontWeight="500">Método de pago</Typography>
            <TextField select fullWidth variant="outlined">
              <MenuItem value="tarjeta">Tarjeta de crédito</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="banco">Transferencia bancaria</MenuItem>
            </TextField>
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
              Continuar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalRecargarBalance;
