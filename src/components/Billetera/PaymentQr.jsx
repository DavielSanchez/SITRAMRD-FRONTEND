import { QRCodeCanvas } from "qrcode.react";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Modal, Fade, Box, Typography, Button, Backdrop, CircularProgress } from "@mui/material";
import { useBGForButtons, useBGForSecondaryButtons } from "../../ColorClass";
import LogoBlue from "../../assets/LogoBlue.svg";
import CryptoJS from "crypto-js";

function PaymentQr({ tarjetaId }) {
  const [openModal, setOpenModal] = useState(false);
  const [otpToken, setOtpToken] = useState(null); // Estado para guardar el OTP
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const userId = decodedToken.id;
  const ButtonColor = useBGForButtons(theme);
  const SecondaryButtonColor = useBGForSecondaryButtons(theme);

  const secretKey = import.meta.env.VITE_QR_KEY;

  const paymentData = { userId, tarjetaId };

  // const encryptedData = CryptoJS.AES.encrypt(
  //   JSON.stringify(paymentData), 
  //   secretKey
  // ).toString(CryptoJS.enc.Base64);

  // Función para generar OTP usando fetch
  const generateOtp = async () => {
    setLoading(true); // Mostrar el loader
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/wallet/generate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, tarjetaId }), // Pasamos los datos necesarios
      });
      
      if (!response.ok) {
        throw new Error("Error al generar OTP");
      }
      
      const data = await response.json();
      setOtpToken(data.token); // Guardamos el OTP generado
    } catch (error) {
      console.error("Error al generar OTP:", error);
    } finally {
      setLoading(false); // Ocultar el loader cuando termine
    }
  };

  // Asegurarse de que los datos estén en base64
  const encodeDataToBase64 = (data) => {
    const wordArray = CryptoJS.enc.Utf8.parse(data); // Convierte el string a un array de palabras
    return CryptoJS.enc.Base64.stringify(wordArray); // Convierte el array de palabras a base64
  };

  const claveSecreta = "5f9242fb225533bed1706b";
  const stringifiedData = JSON.stringify(paymentData);
  const encrypted = CryptoJS.AES.encrypt(stringifiedData, claveSecreta).toString();

  const base64OtpToken = otpToken ? encodeDataToBase64(otpToken) : null;

  return (
    <>
      {/* Botón para abrir el modal y generar OTP */}
      <button
        onClick={() => {
          setOpenModal(true);
          generateOtp(); // Generamos el OTP cuando se abre el modal
        }}
        className={`${ButtonColor} text-white px-4 py-2 rounded-lg shadow cursor-pointer`}
      >
        <QrCodeIcon className="w-6 h-6" />
      </button>

      {/* MODAL */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ sx: { backdropFilter: "blur(5px)" } }}
      >
        <Fade in={openModal}>
          <Box
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
              border: `2px solid ${SecondaryButtonColor}`,
              bgcolor: "background.paper",
              padding: 3,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              fontWeight="bold"
              sx={{ color: "primary.main" }}
            >
              Escanea el QR para pagar
            </Typography>

            {/* Mostrar el loader mientras se genera el OTP */}
            {loading && (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            )}

            {/* Mostrar QR con OTP solo cuando se haya generado */}
            {!loading && otpToken && (
              <Box display="flex" justifyContent="center" mt={2}>
                <QRCodeCanvas 
                  value={encrypted} // Mostramos el OTP en base64 en el QR
                  size={200} 
                  imageSettings={{
                    src: LogoBlue,
                    level: "H",
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </Box>
            )}

            <Box display="flex" justifyContent="center" gap={2} mt={3}>
              <Button
                onClick={() => setOpenModal(false)}
                sx={{
                  width: "90px",
                  height: "35px",
                  backgroundColor: "#d32f2f",
                  borderRadius: "5px",
                  color: "white",
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
              >
                Cerrar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default PaymentQr;
