import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import socket from "../socket";
import BuscarUsuarios from "../components/Chat.jsx/BuscarUsuarios";

function Chat() {
    const [usuarios, setUsuarios] = useState([]);
    const [chatActivo, setChatActivo] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const [chatId, setChatId] = useState("");
    const [chatsUsuario, setChatsUsuario] = useState([]); // Estado para los chats del usuario

    const [mensaje, setMensaje] = useState("");
    const messagesEndRef = useRef(null);

    // Obtener token del usuario
    const token = localStorage.getItem("token");
    let userId = null;
    try {
        if (token) {
            const decodedToken = jwtDecode(token);
            userId = decodedToken?.id;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
    }

    // Función para obtener los chats en los que está el usuario
    const fetchChatsUsuario = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-chats-usuario/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setChatsUsuario(data);
            } else {
                console.error("Error al obtener los chats del usuario");
            }
        } catch (error) {
            console.error("Error al obtener los chats del usuario:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchChatsUsuario(); // Recuperar chats al cargar el componente
        }
    }, [userId]);

    const fetchChat = async (usuarioId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-chat-privados`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emisor: userId,
                    receptor: usuarioId
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return { chatId: data._id, mensajes: data.mensajes };
            } else if (response.status === 404) {
                return null; // Si no existe, devolvemos null
            } else {
                console.error("Error al obtener el chat");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el chat:", error);
            return null;
        }
    };

    const seleccionarUsuario = async (usuario) => {
        const chatExistente = await fetchChat(usuario._id);

        if (chatExistente) {
            setChatActivo(chatExistente);
            setMensajes(chatExistente.mensajes);
            setChatId(chatExistente.chatId); // Asignar el chatId correcto
        } else {
            const nuevoChat = await crearNuevoChat(usuario._id);
            if (nuevoChat) {
                setChatActivo(nuevoChat);
                setMensajes([]);
                setChatId(nuevoChat._id);
            }
        }
    };

    const crearNuevoChat = async (usuarioId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/crear-chat`, {
                method: "POST",
                body: JSON.stringify({
                    tipo: "privado",
                    participantes: [usuarioId, userId],
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const chat = await response.json();
            return chat;
        } catch (error) {
            console.error("Error al crear el chat:", error);
        }
    };

    useEffect(() => {
        if (chatId) {
            fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-mensajes/${chatId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Mensajes recibidos:", data);
                    setMensajes(data.reverse());
                })
                .catch((err) => console.error("Error al obtener mensajes:", err));

                socket.on("mensaje-recibido", (nuevoMensaje) => {
                    setMensajes((prevMensajes) => [nuevoMensaje, ...prevMensajes]);
                });
                

            return () => {
                socket.off("mensaje-recibido");
            };
        }
    }, [chatId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto" }); 
        }
    }, [mensajes]);
    

    const enviarMensaje = () => {
        if (!mensaje.trim() || !userId) return;

        socket.emit("nuevo-mensaje", {
            chatId,
            remitente: userId,
            contenido: mensaje,
            imagenUrl: null,
        });

        setMensaje(""); // Limpiar el campo de mensaje después de enviarlo
    };

    return (
        <>
            <div className="bg-black text-white p-4">
                <h2 className="text-lg font-bold">Chats activos</h2>

                {/* Lista de chats en los que está el usuario */}
                <div className="h-32 overflow-y-auto border border-gray-700 p-2 mb-4">
                    <h3 className="font-bold text-lg">Mis Chats</h3>
                    {chatsUsuario.map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => {
                                if (chatId === chat._id) return; // Evita actualizar si es el mismo chat
                                setChatActivo(chat);
                                setMensajes(chat.mensajes);
                                setChatId(chat._id);
                            }}
                            className={`cursor-pointer p-2 hover:bg-gray-700 ${
                                chatId === chat._id ? "bg-gray-800" : ""
                            }`}
                        >
                            <strong>{chat.nombre || "chat privado"}</strong>
                        </div>
                    ))}
                </div>

                <div className="h-64 overflow-y-auto border border-gray-700 p-2 mb-4 flex flex-col-reverse">
                    {mensajes.map((msg, index) => (
                        <p key={index}>
                            <strong>
                                {typeof msg.remitente === "object"
                                    ? msg.remitente.nombre || "Desconocido"
                                    : msg.remitente}
                            </strong>:{" "}
                            {msg.contenido ? msg.contenido : msg.imagenUrl ? (
                                <a href={msg.imagenUrl} target="_blank" rel="noopener noreferrer">
                                    📷 Imagen
                                </a>
                            ) : "(Mensaje vacío)"}
                        </p>
                    ))}

                    <div ref={messagesEndRef} />
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 p-2 border border-gray-600 bg-gray-800 text-white rounded"
                    />
                    <button
                        onClick={enviarMensaje}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                    >
                        Enviar
                    </button>
                </div>

                <BuscarUsuarios onSeleccionarUsuario={seleccionarUsuario} />
            </div>
        </>
    );
}

export default Chat;
