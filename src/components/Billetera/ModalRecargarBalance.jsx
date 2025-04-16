import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { Modal, Backdrop, Fade, Box, Typography, TextField, MenuItem, Button, InputAdornment } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import {
  useBG,
  useText,
  useBorderColor,
} from "../../ColorClass";
import { useStripe } from "@stripe/react-stripe-js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

function ModalRecargarBalance({ open, onClose, tarjetaId }) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const theme = decodedToken.theme; 

  const MySwal = withReactContent(Swal)
  

  const stripe = useStripe();
  const bgColor = useBG(theme); 
  const textColor = useText(theme); 
  const BorderColor = useBorderColor(theme); 

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/wallet/metodos-pago/${userId}`);
        if (!response.ok) throw new Error("Error al obtener métodos de pago");
        const data = await response.json();
        if (data.metodosPago && Array.isArray(data.metodosPago)) {
          setPaymentMethods(data.metodosPago);  // Guarda solo el array
        } else {
          throw new Error("No se encontraron tarjetas o la estructura es incorrecta.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (open) fetchPaymentMethods();
  }, [open, userId]);

  const handleAmountChange = (event) => {
    let value = event.target.value;
    setAmount(value);
  };

  const handlePayment = async () => {
    if (!selectedMethod || !amount || amount <= 39) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Seleccione un método de pago e ingrese un monto válido (mayor a 39).",
      });
      return;
    }
  
    const sendData = {
      userId,
      amount,
      currency: "DOP",
      paymentMethodId: selectedMethod,
      tarjetaId,
    };
  
    try {
      Swal.fire({
        title: "Procesando pago...",
        text: "Por favor, espere...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/wallet/pay-with-saved-method`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });
  
      const data = await response.json();
  
      if (!data.clientSecret) {
        throw new Error("No se recibió un Client Secret válido.");
      }
  
      setClientSecret(data.clientSecret);
  
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: selectedMethod,
        }
      );
  
      if (confirmError) {
        console.error("Error al confirmar el pago:", confirmError);
        MySwal.fire({
          icon: "error",
          title: "Pago fallido",
          text: "Hubo un problema al procesar el pago. Inténtelo de nuevo.",
        });
      } else {
        console.log("✅ Pago exitoso:", paymentIntent);
        onClose(); 
        MySwal.fire({
          icon: "success",
          title: "Pago exitoso",
          text: `Pago de RD$${amount} realizado correctamente.`,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("❌ Error en el pago:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al procesar el pago. Inténtelo nuevamente.",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backdropFilter: "blur(5px)" }, 
      }}
    >
      <Fade in={open}>
        <Box
          className={`${bgColor} p-4`}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 }, 
            maxWidth: "95vw", 
            maxHeight: "90vh", 
            overflowY: "auto", 
            boxShadow: 24,
            borderRadius: 2,
            border: `2px solid ${BorderColor}`,
            padding: 3, 
          }}
        >
          <Typography variant="h6" align="center" fontWeight="bold" sx={{ color: "#6a62dc" }}>Recargar Balance</Typography>
          <Box mt={2}>
            <Typography fontWeight="500" className={textColor}>Monto a recargar (DOP)<span className="text-red-600">*</span></Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="Ingrese el monto"
              variant="outlined"
              value={amount}
              onChange={handleAmountChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">RD$</InputAdornment>,
                inputProps: { style: { MozAppearance: "textfield" } }, 
              }}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
           
          </Box>
          <Box mt={2}>
            <Typography fontWeight="500" className={textColor}>Método de pago<span className="text-red-600">*</span></Typography>
            <TextField select fullWidth variant="outlined" value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
              {paymentMethods.length > 0 ? paymentMethods.map((method) => (
                <MenuItem key={method._id} value={method.paymentMethodId}>{method.Apodo} - {method.last4}</MenuItem>
              )) : <MenuItem disabled>No hay métodos disponibles</MenuItem>}
            </TextField>
          </Box>
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button onClick={handlePayment} sx={{ backgroundColor: "#6a62dc", color: "white" }}>Continuar</Button>
            <Button onClick={onClose} sx={{ backgroundColor: "#d32f2f", color: "white" }}>Cancelar</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalRecargarBalance;

ModalRecargarBalance.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tarjetaId: PropTypes.string.isRequired,
};