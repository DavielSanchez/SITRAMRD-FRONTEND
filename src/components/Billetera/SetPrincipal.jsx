import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CircularProgress from "@mui/material/CircularProgress";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function SetPrincipal({ tarjetaId, esPrincipal, hayOtraTarjeta }) {
  const [principal, setPrincipal] = useState(esPrincipal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrincipal(esPrincipal);
  }, [esPrincipal]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const theme = decodedToken.theme;
  const MySwal = withReactContent(Swal);

  const togglePrincipal = async () => {
    if (principal && !hayOtraTarjeta) {
      await MySwal.fire({
        title: "Acción no permitida",
        text: "No puedes quitar esta tarjeta como principal sin establecer otra primero.",
        icon: "error",
        confirmButtonColor: theme === "dark" ? "#df4747" : "#5c55c7",
      });
      return;
    }

    const isDarkTheme = theme === "dark";
    const nuevoEstado = !principal;

    const confirmResult = await MySwal.fire({
      title: nuevoEstado ? "¿Establecer como principal?" : "¿Quitar como principal?",
      text: nuevoEstado
        ? "Esta tarjeta será la principal para tus transacciones."
        : "Debes elegir otra tarjeta principal antes de quitar esta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isDarkTheme ? "#5c55c7" : "#5c55c7",
      cancelButtonColor: isDarkTheme ? "#df4747" : "#df4747",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      background: isDarkTheme ? "#000000" : "#ffffff",
      color: isDarkTheme ? "#fff" : "#161616",
    });

    if (!confirmResult.isConfirmed) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/wallet/tarjetas/set-principal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            usuarioId: userId, 
            tarjetaId 
        }),
        }
      );

      if (response.ok) {
        setPrincipal(nuevoEstado);

        await MySwal.fire({
          title: "Tarjeta actualizada",
          text: nuevoEstado
            ? "Esta tarjeta ahora es la principal."
            : "Recuerda elegir otra tarjeta principal.",
          icon: "success",
          confirmButtonColor: isDarkTheme ? "#6a62dc" : "#6a62dc",
        });

        window.location.reload();
      } else {
        throw new Error("Error al actualizar la tarjeta principal.");
      }
    } catch (error) {
      console.error("Error:", error);
      await MySwal.fire({
        title: "Error",
        text: "No se pudo actualizar la tarjeta principal. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonColor: isDarkTheme ? "#df4747" : "#5c55c7",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : principal ? (
        <StarIcon
          className="w-6 h-6 cursor-not-allowed text-yellow-500 transition"
        />
      ) : (
        <StarBorderIcon
          className="w-6 h-6 cursor-pointer text-[##6A62DC] hover:text-yellow-500 hover:border-2 hover:rounded-sm transition"
          onClick={togglePrincipal}
        />
      )}
    </>
  );
}

export default SetPrincipal;

SetPrincipal.propTypes = {
  tarjetaId: PropTypes.string.isRequired,
  esPrincipal: PropTypes.bool.isRequired,
  hayOtraTarjeta: PropTypes.bool.isRequired
};
