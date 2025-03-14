import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import socket from "../socket";
import BuscarUsuarios from "../components/Chat.jsx/BuscarUsuarios";



function Chat() {
    const [chatActivo, setChatActivo] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const [mensajesNoLeidos, setMensajesNoLeidos] = useState({});
    const [chatId, setChatId] = useState("");
    const [chatsUsuario, setChatsUsuario] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const messagesEndRef = useRef(null);

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

    const fetchChatsUsuario = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-chats-usuario/${userId}`);
            if (response.ok) {
                const data = await response.json();
                const chatsUnicos = data.filter((chat, index, self) =>
                    index === self.findIndex((t) => (
                        t._id === chat._id
                    ))
                );
                setChatsUsuario(chatsUnicos);
            } else {
                console.error("Error al obtener los chats del usuario");
            }
        } catch (error) {
            console.error("Error al obtener los chats del usuario:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchChatsUsuario();
        }
    }, [userId]);
    

    const fetchChat = async (usuarioId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-chat-por-usuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emisor: userId,
                    receptor: usuarioId,
                }),
            });

            if (response.ok) {
                const chatData = await response.json();
                console.log("Chat cargado correctamente:", chatData);
                return chatData;
            }
            return null;
        } catch (error) {
            console.error("Error al obtener el chat:", error);
            return null;
        }
    };

    const crearNuevoChat = async (usuarioId) => {
        try {
            const chatExistente = await fetchChat(usuarioId);
            if (chatExistente) {
                console.log("El chat ya existe:", chatExistente);
                return chatExistente;
            }

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

        const seleccionarUsuario = async (usuario) => {
        const chatExistente = chatsUsuario.find(chat => chat.participantes.includes(usuario._id));

        if (chatExistente) {
            const mensajesOrdenados = [...chatExistente.mensajes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setChatActivo(chatExistente);
            setMensajes(mensajesOrdenados);
            setChatId(chatExistente._id);
        } else {
            console.log("No existe un chat con este usuario.");
            const nuevoChat = await crearNuevoChat(usuario._id);
            if (nuevoChat) {
                setChatsUsuario(prevChats => [...prevChats, nuevoChat]);
                setChatActivo(nuevoChat);
                setChatId(nuevoChat._id);
            }
        }
    };

    const marcarComoLeido = async (mensajeId) => {
        // Primero, actualiza el estado de manera optimista
        setMensajes((prevMensajes) =>
            prevMensajes.map((msg) =>
                msg._id === mensajeId
                    ? { ...msg, leidoPor: [...msg.leidoPor, { usuarioId: userId, leido: true }] }
                    : msg
            )
        );
    
        try {
            // Luego, realiza la solicitud a la API para persistir el cambio
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/marcar-como-leido`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mensajeId,
                    usuarioId: userId,
                }),
            });
    
            if (response.ok) {
                // Emitir el evento a través de socket para actualizar a todos los usuarios conectados
                socket.emit("marcar-como-leido", { mensajeId, usuarioId: userId });
            } else {
                console.log("Hubo un problema al marcar el mensaje como leído");
            }
        } catch (error) {
            console.error("Error al marcar el mensaje como leído:", error);
        }
    };
    
    useEffect(() => {
        if (chatId) {
            const obtenerMensajes = async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-mensajes/${chatId}?usuarioId=${userId}`);
                    const data = await res.json();
                    const mensajesOrdenados = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Orden descendente
                    setMensajes(mensajesOrdenados);
                    
                    // Marcar los mensajes como leídos tan pronto lleguen
                    data.forEach(mensaje => {
                        if (mensaje.remitente !== userId) {
                            marcarComoLeido(mensaje._id);
                        }
                    });
    
                    // Actualiza el conteo de mensajes no leídos después de obtener los mensajes
                    const mensajesNoLeidosPorChat = {
                        [chatId]: contarMensajesNoLeidos(data, userId),
                    };
                    setMensajesNoLeidos(mensajesNoLeidosPorChat);
                } catch (err) {
                    console.error("Error al obtener mensajes:", err);
                }
            };
    
            obtenerMensajes();
    
            const manejarNuevoMensaje = (nuevoMensaje) => {
                // Verifica si el nuevo mensaje pertenece al chat actual antes de agregarlo
                if (nuevoMensaje.chatId === chatId) {
                    setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
                    if (nuevoMensaje.remitente !== userId) {
                        marcarComoLeido(nuevoMensaje._id);
                    }
                }
            };
    
            // Escuchar el evento de un mensaje marcado como leído
            socket.on("marcar-como-leido", (mensajeActualizado) => {
                setMensajes((prevMensajes) =>
                    prevMensajes.map((msg) =>
                        msg._id === mensajeActualizado._id
                            ? { ...msg, leidoPor: mensajeActualizado.leidoPor }
                            : msg
                    )
                );
            });
    
            // Escuchar el evento de mensaje recibido
            socket.on("mensaje-recibido", manejarNuevoMensaje);
    
            return () => {
                socket.off("mensaje-recibido", manejarNuevoMensaje);
                socket.off("marcar-como-leido");
            };
        }
    }, [chatId, userId]);
    
    


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        console.log(chatActivo)
    }, [mensajes]);

    const enviarMensaje = () => {
        if (!mensaje.trim() || !userId || !chatId) return;

        socket.emit("nuevo-mensaje", {
            chatId,
            remitente: userId,
            contenido: mensaje,
            imagenUrl: null,
        });

        setMensaje("");
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            const isAtBottom = messagesEndRef.current.getBoundingClientRect().top <= window.innerHeight;
            if (isAtBottom) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [mensajes]);

    useEffect(() => {
        socket.on("marcar-como-leido", (mensajeActualizado) => {
            setMensajes((prevMensajes) =>
                prevMensajes.map((msg) =>
                    msg._id === mensajeActualizado._id
                        ? { ...msg, leidoPor: mensajeActualizado.leidoPor } // Actualiza la propiedad leidoPor
                        : msg
                )
            );
        });
    
        return () => {
            socket.off("marcar-como-leido"); // Limpiar el evento cuando el componente se desmonte
        };
    }, []);

    useEffect(() => {
        socket.on("mensaje-recibido", (nuevoMensaje) => {
            if (nuevoMensaje.chatId !== chatId) {
                setMensajesNoLeidos((prev) => ({
                    ...prev,
                    [nuevoMensaje.chatId]: (prev[nuevoMensaje.chatId] || 0) + 1,
                }));
            }
        });
    
        return () => {
            socket.off("mensaje-recibido");
        };
    }, [chatId]);

    const contarMensajesNoLeidos = (mensajes, userId) => {
        return mensajes.filter(mensaje => 
            mensaje.remitente !== userId && 
            !mensaje.leidoPor.some(leido => leido.userId === userId)
        ).length;
    };

    useEffect(() => {
        if (chatsUsuario.length > 0) {
            const mensajesNoLeidosPorChat = {};
            
            chatsUsuario.forEach(chat => {
                const noLeidos = contarMensajesNoLeidos(chat.mensajes, userId);
                if (noLeidos > 0) {
                    mensajesNoLeidosPorChat[chat._id] = noLeidos;
                }
            });
    
            setMensajesNoLeidos(mensajesNoLeidosPorChat);
        }
    }, [chatsUsuario, userId]);

    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-full ml-[10vw] h-full">
                <main className="mt-2 bg-black flex-1 flex">

                <div className="w-1/4 p-4 bg-gray-800 border-r border-gray-700 h-full fixed top-0 left-0 flex flex-col">
                    <h2 className="text-lg font-bold mb-4">Chats activos</h2>
                    
                    <div>
                        <BuscarUsuarios onSeleccionarUsuario={seleccionarUsuario} />
                    </div>

                    {/* Contenedor con scroll solo para los chats */}
                    <div className="flex-1 overflow-auto">
                        {chatsUsuario.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => {
                                    if (chatId === chat._id) return;
                                    setChatActivo(chat);
                                    setMensajes(chat.mensajes);
                                    setChatId(chat._id);
                                    setMensajesNoLeidos(prev => ({
                                        ...prev,
                                        [chat._id]: 0
                                    }));
                                }}
                                className={`cursor-pointer p-2 mb-2 hover:bg-gray-700 rounded ${chatId === chat._id ? "bg-gray-600" : ""}`}
                            >
                                <div className="flex items-center gap-2 relative">
                                    {chat.tipo === "privado" ? (
                                        chat.participantes
                                            .filter((participante) => participante._id !== userId)
                                            .map((usuario) => (
                                                <img
                                                    key={usuario._id}
                                                    src={usuario.userImage || "/ruta/por/defecto/imagen.jpg"}
                                                    alt="Avatar del usuario"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ))
                                    ) : (
                                        <img
                                            src={chat.imagenUrl || "/ruta/por/defecto/imagen.jpg"}
                                            alt="Avatar del grupo"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    )}
                                    
                                    <div className="flex items-center gap-1">
                                        <p className="text-white">{chat.nombre || "Chat de grupo"}</p>

                                        {/* Indicador de mensajes no leídos */}
                                        {mensajesNoLeidos[chat._id] > 0 && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                {mensajesNoLeidos[chat._id]}
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-600 mt-2"></div>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 mt-2">
                        Crear Grupo
                    </button>
                </div>


                    <div className="w-3/4 p-4 flex flex-col h-full ml-[15%] fixed">
                    {chatActivo ? (
                        chatActivo.tipo === "privado" ? (
                            chatActivo.participantes
                                .filter((participante) => participante._id !== userId)
                                .map((usuario) => (
                                    <div key={usuario._id} className="flex items-center gap-2">
                                        <img 
                                            src={usuario.userImage || "/default-user.png"} 
                                            alt="Foto de usuario"
                                            className="w-13 h-13 rounded-full object-cover"
                                        />
                                        <span className="text-2xl font-medium">{usuario.nombre}</span>
                                    </div>
                                ))
                        ) : (
                            <div className="flex items-center gap-2">
                                <img 
                                    src={chatActivo.imagenUrl || "/default-group.png"} 
                                    alt="Foto del grupo"
                                    className="w-13 h-13 rounded-full object-cover"
                                />
                                <span className="text-2xl font-medium">{chatActivo.nombre || "Chat de grupo"}</span>
                            </div>
                        )
                    ) : null }

                        <div className="flex-1 overflow-y-auto overflow-x-hidden border border-gray-700 p-2 mb-4 mt-5 flex flex-col h-full">
                            <div className="mensajes">
                            {chatActivo ? (
                                mensajes && mensajes.length > 0 ? (
                                    mensajes.map((msg, index) => {
                                        return (
                                            <div
                                            key={index}
                                            className={`flex ${msg.remitente === userId ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {/* Obtener el usuario remitente */}
                                            {msg.remitente !== userId && chatActivo ? (
                                                chatActivo.participantes
                                                    .filter((participante) => participante._id === msg.remitente)
                                                    .map((usuario) => (
                                                        <img
                                                            key={usuario._id}
                                                            src={usuario.userImage || "/ruta/por/defecto/imagen.jpg"} 
                                                            alt="Avatar"
                                                            className={`w-8 h-8 rounded-full object-cover ${msg.remitente === userId ? 'ml-2' : 'mr-2'}`}
                                                        />
                                                    ))
                                            ) : null}

                                            <div
                                                className={`mensaje p-2 m-1 max-w-[50%] rounded-lg text-sm break-words whitespace-pre-wrap ${
                                                    msg.remitente === userId // Si el remitente es el usuario actual
                                                        ? msg.leidoPor.length > 0 // Si hay al menos un receptor
                                                            ? msg.leidoPor.every((leido) => leido.leido === true) // Si todos los receptores han leído
                                                                ? 'bg-green-500' // Todos los receptores lo han leído
                                                                : 'bg-gray-300' // Si al menos uno no lo ha leído
                                                            : 'bg-gray-300' // Si no hay receptores, lo consideramos no leído
                                                        : 'bg-blue-500 text-white self-end' // Si no es el remitente, mostramos el mensaje del usuario
                                                }`}
                                            >
                                                <p className="text-xs text-black font-semibold">
                                                    {
                                                        chatActivo.participantes.find((p) => p._id === msg.remitente)?.nombre ||
                                                        "Usuario desconocido"
                                                    }
                                                </p>
                                                <p>{msg.contenido}</p>
                                                <p className="text-xs text-black-500 mt-1 text-right">
                                                {msg.enviadoEn ? new Date(msg.enviadoEn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Hora no disponible"}
                                                </p>
                                            </div>
                                        </div>
                                        )
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <img
                                            src="../assets/react.svg"
                                            alt="Sin mensajes"
                                            className="w-40 h-40 opacity-50"
                                        />
                                        <p className="text-gray-500 mt-4">No hay mensajes en esta conversación.</p>
                                    </div>
                                )
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full">
                                    <img
                                        src="/ruta/imagen-no-chat.png"
                                        alt="Sin conversación"
                                        className="w-40 h-40 opacity-50"
                                    />
                                    <p className="text-gray-500 mt-4">
                                        No hay una conversación seleccionada. Selecciona un usuario para empezar.
                                    </p>
                                </div>
                                )}
                            </div>
                            <div ref={messagesEndRef} />
                        </div>

                        {chatActivo ? (
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
                            ):null}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Chat;

