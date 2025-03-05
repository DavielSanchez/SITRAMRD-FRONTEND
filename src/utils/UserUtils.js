// userUtils.js
import { jwtDecode } from "jwt-decode";

export const getUserData = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  return decodedToken;
};

export const updateUserProfile = async (userId, newImageUrl, newNombre, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_LINK}/auth/users/put/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: newNombre,
          userImage: newImageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el perfil");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
