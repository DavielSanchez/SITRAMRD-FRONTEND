import React, { useState } from "react";
import { Modal, Backdrop, Fade, Box, Typography, Button, TextField } from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

function ModalAñadirMetodoPago({ open, onClose, userId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [Apodo, setApodo] = useState(""); // Estado para el apodo

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    if (!Apodo.trim()) {
      Swal.fire("Error", "El apodo es obligatorio", "error");
      return;
    }

    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/wallet/guardar-metodo-pago`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, Apodo, paymentMethodId: paymentMethod.id }),
      });


      const data = await response.json();

      if (response.ok) {
        Swal.fire("Éxito", "Método de pago agregado correctamente", "success");
        onClose();
      } else {
        Swal.fire("Error", data.error || "No se pudo guardar el método de pago", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Ocurrió un problema al conectar con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ sx: { backdropFilter: "blur(5px)" } }}
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
            border: "2px solid #6a62dc",
          }}
        >
          <Typography variant="h6" align="center" fontWeight="bold" sx={{ color: "#6a62dc" }}>
            Agregar Método de Pago
          </Typography>

          {/* Apodo */}
          <Box mt={2}>
            <Typography fontWeight="500">Apodo</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ingrese un apodo"
              value={Apodo}
              onChange={(e) => setApodo(e.target.value)}
            />
          </Box>

          {/* Campo de tarjeta de Stripe */}
          <Box mt={3} p={2} sx={{ border: "1px solid #ccc", borderRadius: "5px" }}>
            <CardElement options={{ hidePostalCode: true }} />
          </Box>

          {/* Botones */}
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button
              onClick={onClose}
              sx={{
                width: "90px",
                height: "35px",
                backgroundColor: "#d32f2f",
                borderRadius: "10px",
                color: "white",
                "&:hover": { backgroundColor: "#b71c1c" },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                width: "90px",
                height: "35px",
                backgroundColor: "#6a62dc",
                borderRadius: "10px",
                color: "white",
                "&:hover": { backgroundColor: "#5a52c9" },
              }}
            >
              {loading ? "Guardando..." : "Agregar"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalAñadirMetodoPago;
