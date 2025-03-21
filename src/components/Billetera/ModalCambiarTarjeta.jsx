import React from "react";
import { Modal, Backdrop, Fade, Box, Typography, MenuItem, Button, Select } from "@mui/material";

function ModalCambiarTarjeta({ open, onClose }) {
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
            Cambiar Tarjeta
          </Typography>

          {/* Selección de tarjeta */}
          <Box mt={2}>
            <Typography fontWeight="500">Seleccionar tarjeta</Typography>
            <Select fullWidth variant="outlined">
              <MenuItem value="tarjeta1">Tarjeta 1</MenuItem>
              <MenuItem value="tarjeta2">Tarjeta 2</MenuItem>
              <MenuItem value="tarjeta3">Tarjeta 3</MenuItem>
            </Select>
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

export default ModalCambiarTarjeta;
