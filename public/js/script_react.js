const e = React.createElement;

function CatalogoRutas() {
    const [rutas, setRutas] = React.useState([]);
    const [busqueda, setBusqueda] = React.useState('');
    // Cambio: ahora usamos un arreglo para guardar múltiples rutas
    const [idsSeleccionadas, setIdsSeleccionadas] = React.useState([]); 
    const [desplegado, setDesplegado] = React.useState(true); 

    React.useEffect(() => {
        const manejarRutasCargadas = (evento) => setRutas(evento.detail);
        window.addEventListener('rutasCargadas', manejarRutasCargadas);

        if (window.datosRutas && window.datosRutas.length > 0) {
            setRutas(window.datosRutas);
        }

        return () => window.removeEventListener('rutasCargadas', manejarRutasCargadas);
    }, []);

    // Nueva función para seleccionar/deseleccionar múltiples
    const toggleRuta = (id) => {
        let nuevasSeleccionadas;
        
        if (id === 'todas') {
            // Si ya están todas, deseleccionamos; si no, seleccionamos todas
            nuevasSeleccionadas = idsSeleccionadas.length === rutas.length ? [] : rutas.map(r => r.id_ruta);
        } else {
            // Agregar o quitar la ruta del arreglo
            if (idsSeleccionadas.includes(id)) {
                nuevasSeleccionadas = idsSeleccionadas.filter(rutaId => rutaId !== id);
            } else {
                nuevasSeleccionadas = [...idsSeleccionadas, id];
            }
        }
        
        setIdsSeleccionadas(nuevasSeleccionadas);
        
        // Enviar el arreglo al mapa
        if (typeof window.resaltarRutaEnMapa === 'function') {
            window.resaltarRutaEnMapa(nuevasSeleccionadas);
        }
    };

    const rutasFiltradas = rutas.filter(ruta =>
        ruta.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return e('div', { 
        style: { display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' } 
    }, [
        e('div', { 
            key: 'header-panel', 
            onClick: () => setDesplegado(!desplegado),
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' } 
        }, [
            e('h2', { key: 'titulo', style: { fontSize: '1.1rem', color: '#1a1a1a' } }, 'Rutas de Culiacán'),
            e('span', { key: 'indicador-movil', style: { fontSize: '0.85rem', color: '#0056b3', fontWeight: 'bold' } }, desplegado ? '▼ Ocultar' : '▲ Ver rutas')
        ]),

        desplegado && e(React.Fragment, { key: 'contenido-panel' }, [
            e('input', {
                key: 'input-busqueda',
                type: 'text',
                placeholder: '🔍 Buscar ruta o colonia...',
                value: busqueda,
                onChange: (evt) => setBusqueda(evt.target.value),
                style: { padding: '12px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '16px' }
            }),

            e('button', {
                key: 'btn-todas',
                onClick: () => toggleRuta('todas'),
                style: {
                    padding: '10px',
                    // Cambia color si todas están seleccionadas
                    backgroundColor: idsSeleccionadas.length === rutas.length && rutas.length > 0 ? '#003d80' : '#0056b3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    minHeight: '44px' 
                }
            }, idsSeleccionadas.length === rutas.length && rutas.length > 0 ? 'Deseleccionar todas' : 'Ver todas en el mapa'),

            e('div', { key: 'lista', style: { overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '30vh' } },
                rutasFiltradas.length > 0
                    ? rutasFiltradas.map(ruta => 
                        e('div', {
                            key: ruta.id_ruta,
                            onClick: () => toggleRuta(ruta.id_ruta),
                            style: {
                                padding: '12px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                // Evalúa si la ruta está en el arreglo de seleccionadas
                                backgroundColor: idsSeleccionadas.includes(ruta.id_ruta) ? '#e6f2ff' : '#ffffff',
                                borderColor: idsSeleccionadas.includes(ruta.id_ruta) ? '#0056b3' : '#e0e0e0'
                            }
                        }, [
                            e('strong', { key: 'nombre', style: { display: 'block', color: '#222', fontSize: '0.95rem' } }, ruta.nombre),
                            e('span', { key: 'sub', style: { fontSize: '0.8rem', color: '#666' } }, 'Tocar para mostrar/ocultar')
                        ])
                    )
                    : e('p', { key: 'no-datos', style: { color: '#888', fontSize: '0.9rem', textAlign: 'center', padding: '10px' } }, 'No se encontraron rutas.')
            )
        ])
    ]);
}

const contenedor = document.getElementById('react-root');
if (contenedor) {
    const root = ReactDOM.createRoot(contenedor);
    root.render(e(CatalogoRutas));
}