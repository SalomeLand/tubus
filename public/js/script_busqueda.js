window.resaltarRutaEnMapa = function(idsSeleccionadas) {
    if (!map || Object.keys(capasRutas).length === 0) return;

    // 1. Quitar siempre todas las rutas del mapa para limpiar
    Object.values(capasRutas).forEach(capa => {
        map.removeLayer(capa);
    });

    // 2. Si el arreglo está vacío, centrar la cámara en la ciudad sin mostrar rutas
    if (!idsSeleccionadas || idsSeleccionadas.length === 0) {
        map.setView([24.8088, -107.3942], 13);
        return;
    }

    // 3. Crear una caja de límites (bounds) para centrar la cámara en las seleccionadas
    let bounds = L.latLngBounds();
    let hayRutasVisibles = false;

    // 4. Agregar al mapa únicamente las rutas seleccionadas
    idsSeleccionadas.forEach(id => {
        const capaSeleccionada = capasRutas[id];
        if (capaSeleccionada) {
            capaSeleccionada.addTo(map);
            bounds.extend(capaSeleccionada.getBounds());
            hayRutasVisibles = true;
        }
    });

    // 5. Ajustar el zoom para que se vean todas las seleccionadas
    if (hayRutasVisibles) {
        map.fitBounds(bounds);
    }
};