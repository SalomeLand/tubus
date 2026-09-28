let map;
let capasRutas = {}; // Diccionario para guardar las polilíneas por id_ruta

function initMap() {
    // Centrado en las coordenadas de Culiacán, Sinaloa
    map = L.map('mapa').setView([24.8088, -107.3942], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

function parseWKTLineString(wkt) {
    if (!wkt) return [];
    
    const coordsString = wkt.replace(/LINESTRING\s*\(/i, '').replace(')', '');
    const points = coordsString.split(',');

    return points.map(point => {
        const [lng, lat] = point.trim().split(/\s+/).map(Number);
        return [lat, lng]; // Invertir orden para Leaflet
    });
}

function dibujarRutas(rutas) {
    rutas.forEach(ruta => {
        const latLngs = parseWKTLineString(ruta.coordenadas);
        
        if (latLngs.length > 0) {
            const polyline = L.polyline(latLngs, {
                color: '#0056b3', // Azul TuBus
                weight: 5,
                opacity: 0.7
            });

            polyline.bindPopup(`<b>${ruta.nombre}</b>`);
            polyline.addTo(map);
            
            // Guardar la referencia de la línea usando su ID
            capasRutas[ruta.id_ruta] = polyline;
        }
    });
}