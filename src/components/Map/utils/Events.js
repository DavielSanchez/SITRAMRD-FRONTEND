//Usuario Cancelo Viaje

export const CancelarViaje = () =>{
    
}

//Usuario Comenzo un viaje

//Realizar el pago
//Guardar la actividad del usuario
//


export const StartViaje = (latitud, longitud, destinoLat, destinoLng) =>{
    const origen = {lat: latitud, lng: longitud}
    const destino = {destinoLat: destinoLat, destinoLng: destinoLng}

    localStorage.setItem("origen", JSON.stringify(origen));
    localStorage.setItem("destino", JSON.stringify(destino));
}


//Usuario llego a una parada