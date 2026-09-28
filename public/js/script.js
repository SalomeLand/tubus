// Variable global para almacenar las rutas
let datosRutas = [];

async function cargarDatosIniciales() {
    try {
        const response = await fetch('http://localhost:3001/api/rutas/trazados');
        const result = await response.json();
        
        if (result.success) {
            datosRutas = result.data;
            
            // Inicializar el mapa y trazar las rutas (funciones de script_mapa.js)
            initMap(); 
            dibujarRutas(datosRutas);
            
            // Emitir un evento para avisarle a React que los datos ya están disponibles
            window.dispatchEvent(new CustomEvent('rutasCargadas', { detail: datosRutas }));
        }
    } catch (error) {
        console.error('Error cargando la API de TuBus:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Simulación de carga de usuario
    document.getElementById('info-usuario').innerText = 'Hola, Usuario';
    
    // Iniciar el flujo de la aplicación
    cargarDatosIniciales();
});