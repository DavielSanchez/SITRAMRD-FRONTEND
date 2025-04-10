import React from 'react';
// a la funcion agregale un parametro que acepte el tipo osea, vehiculo, bicicleta o a pie
    const getIcon = (type) => {
        switch (type) {
            case 'vehiculo':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 16l-1.5 4h17L19 16M5 16V6a2 2 0 012-2h10a2 2 0 012 2v10m-14 0h14"
                        />
                    </svg>
                );
            case 'bicicleta':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 16a4 4 0 100-8 4 4 0 000 8zm14 0a4 4 0 100-8 4 4 0 000 8zM5 16l4-4m0 0l4 4m-4-4l4-4m4 4h4"
                        />
                    </svg>
                );
            case 'a pie':
                return (
                    <img src="https://media.discordapp.net/attachments/984974925938950204/1354501444425875650/para-caminar.png?ex=67e58545&is=67e433c5&hm=d5ea9999993048798a4e41bbdab0d2957eb16d10cbc700db1e4a1d51e8809b46&=&format=webp&quality=lossless&width=54&height=54" alt="" className='size-5' />
                );
            case 'metro':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 16V6a2 2 0 012-2h10a2 2 0 012 2v10m-14 0h14m-14 0l-1.5 4m15.5-4l1.5 4"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };


function DirectionModal({ directions, onClose }) {
    // console.log("Esta fueron las direcciones", directions);
    if (!directions) return null;

    return (
        <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 max-w-sm z-50" draggable="false">
            <div className="flex justify-between items-center">
                {/* Título */}
                <h3 className="text-lg font-semibold">Direcciones</h3>
                {/* Botón de cierre */}
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>

            {/* Lista de direcciones */}
            <div className="mt-4">
                {directions.map((step, index) => (
                    <div key={index} className="mb-2 bg-gray-900/70 p-4 rounded-lg border-2 border-transparent hover:border-white cursor-pointer">
                       <div className="flex gap-2">
                        {getIcon("a pie")}
                       <p className="text-sm">{step.direccion}</p>
                       </div>
                    </div>
                ))}
            </div>
            <p className="text-sm ml-1 mt-3">Tiempo estimado: 47 Mins</p>
        </div>
    );
}

export default DirectionModal;