// Función para mostrar una sola ruta y ocultar las demás
window.resaltarRutaEnMapa = function(idRuta) {
    // Si no hay mapa o capas, salir
    if (!map || Object.keys(capasRutas).length === 0) return;

    // Quitar todas las rutas del mapa
    Object.values(capasRutas).forEach(capa => {
        map.removeLayer(capa);
    });

    // Si se pasa 'todas' o null, volver a mostrar el mapa completo
    if (idRuta === 'todas' || !idRuta) {
        Object.values(capasRutas).forEach(capa => {
            capa.addTo(map);
        });
        map.setView([24.8088, -107.3942], 13);
        return;
    }

    // Si la ruta existe, agregarla y centrar la cámara en ella
    const capaSeleccionada = capasRutas[idRuta];
    if (capaSeleccionada) {
        capaSeleccionada.addTo(map);
        map.fitBounds(capaSeleccionada.getBounds());
        capaSeleccionada.openPopup();
    }
};