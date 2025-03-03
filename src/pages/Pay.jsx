import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
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
