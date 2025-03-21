import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Pay() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [cardBalance, setCardBalance] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  useEffect(() => {
    GetCard()
  }, [userId])

  const GetCard = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_LINK}/wallet/user/tarjetas/virtuales/${userId}`)

    const data = await response.json();
      console.log("Client Secret recibido:", data);
      setCardBalance(data[0].saldo)
      setCardNumber(data[0].numeroTarjeta)

      if (!data) {
        throw new Error("No se recibió un Client Secret válido.");
      }


  }

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe no está cargado aún.");
      setLoading(false);
      return;
    }

    // Obtener el elemento de tarjeta
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("No se encontró el campo de tarjeta.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Enviar la solicitud al backend para crear el PaymentIntent
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/wallet/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            amount: 50, // 💰 Ajusta esto dinámicamente según tu lógica
            currency: "usd",
            tarjetaId: "67b4d510d88625d024edf5f7",
          }),
        }
      );

      const data = await response.json();
      console.log("Client Secret recibido:", data);

      if (!data.clientSecret) {
        throw new Error("No se recibió un Client Secret válido.");
      }

      setClientSecret(data.clientSecret);

      // 2️⃣ Confirmar el pago con Stripe en el frontend
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (confirmError) {
        setError(`Error de pago: ${confirmError.message}`);
        console.error("Error al confirmar el pago:", confirmError);
      } else {
        console.log("Pago exitoso:", paymentIntent);
      }
    } catch (error) {
      setError(`Error obteniendo clientSecret: ${error.message}`);
      console.error("Error en el pago:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

<div className="w-[388px] h-[187px] relative">
  <div className="w-[388px] h-[187px] left-0 top-0 absolute bg-[#6a62dc] rounded-[22px]" />
  <div className="w-[228px] h-14 left-[18px] top-[92px] absolute text-white text-[34px] font-bold font-['Inter']">RD$ {cardBalance}.00</div>
  <div className="w-[254px] left-[18px] top-[135px] absolute text-white text-[13px] font-normal font-['Inter']">Ultima recarga: 2/9/2025 </div>
  <div className="w-[158px] left-[18px] top-[55px] absolute text-white text-[15px] font-normal font-['Inter']">{cardNumber}</div>
  {/* <div className="w-[158px] left-[18px] top-[55px] absolute text-white text-[15px] font-normal font-['Inter']">**** **** **** 7479</div> */}
  <div className="w-[289px] left-[18px] top-[155px] absolute text-white text-[13px] font-normal font-['Inter']">Ultimo viaje: 2/9/2025 10:25 AM</div>
  <div className="left-[18px] top-[16px] absolute text-white text-[28px] font-bold font-['Inter']">Daviel Alexander Sanchez</div>
</div>

      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Pago con Tarjeta</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border border-gray-300 rounded-md p-3">
            <CardElement className="w-full" />
          </div>
          <button
            className={`w-full text-white py-2 rounded-md transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            type="submit"
            disabled={!stripe || loading}
          >
            {loading ? "Procesando..." : "Pagar $50.00"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pay;
