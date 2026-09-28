const e = React.createElement;

function CatalogoRutas() {
    const [rutas, setRutas] = React.useState([]);
    const [busqueda, setBusqueda] = React.useState('');
    const [idSeleccionada, setIdSeleccionada] = React.useState(null);
    const [desplegado, setDesplegado] = React.useState(true); // Estado para abrir/cerrar panel en móvil

    React.useEffect(() => {
        const manejarRutasCargadas = (evento) => setRutas(evento.detail);
        window.addEventListener('rutasCargadas', manejarRutasCargadas);

        if (window.datosRutas && window.datosRutas.length > 0) {
            setRutas(window.datosRutas);
        }

        return () => window.removeEventListener('rutasCargadas', manejarRutasCargadas);
    }, []);

    const seleccionarRuta = (id) => {
        setIdSeleccionada(id);
        if (typeof window.resaltarRutaEnMapa === 'function') {
            window.resaltarRutaEnMapa(id);
        }
        // En móviles, cerramos levemente el panel para ver la ruta seleccionada
        if (window.innerWidth <= 768) {
            setDesplegado(false);
        }
    };

    const rutasFiltradas = rutas.filter(ruta =>
        ruta.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return e('div', { 
        style: { 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            height: '100%' 
        } 
    }, [
        // Barra superior del panel con botón para ocultar/mostrar en móviles
        e('div', { 
            key: 'header-panel', 
            onClick: () => setDesplegado(!desplegado),
            style: { 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer',
                userSelect: 'none'
            } 
        }, [
            e('h2', { key: 'titulo', style: { fontSize: '1.1rem', color: '#1a1a1a' } }, 'Rutas de Culiacán'),
            e('span', { 
                key: 'indicador-movil', 
                style: { fontSize: '0.85rem', color: '#0056b3', fontWeight: 'bold' } 
            }, desplegado ? '▼ Ocultar' : '▲ Ver rutas')
        ]),

        // Contenido del panel (se oculta en móvil si desplegado === false)
        desplegado && e('React.Fragment', { key: 'contenido-panel' }, [
            e('input', {
                key: 'input-busqueda',
                type: 'text',
                placeholder: '🔍 Buscar ruta o colonia...',
                value: busqueda,
                onChange: (evt) => setBusqueda(evt.target.value),
                style: {
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    width: '100%',
                    fontSize: '16px' // Previene zoom automático en iOS Safari
                }
            }),

            e('button', {
                key: 'btn-todas',
                onClick: () => seleccionarRuta('todas'),
                style: {
                    padding: '10px',
                    backgroundColor: idSeleccionada === 'todas' ? '#003d80' : '#0056b3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    minHeight: '44px' // Botón optimizado para tamaño táctil estándar
                }
            }, 'Ver todas en el mapa'),

            e('div', {
                key: 'lista',
                style: {
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    maxHeight: '30vh'
                }
            },
                rutasFiltradas.length > 0
                    ? rutasFiltradas.map(ruta => 
                        e('div', {
                            key: ruta.id_ruta,
                            onClick: () => seleccionarRuta(ruta.id_ruta),
                            style: {
                                padding: '12px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                backgroundColor: idSeleccionada === ruta.id_ruta ? '#e6f2ff' : '#ffffff',
                                borderColor: idSeleccionada === ruta.id_ruta ? '#0056b3' : '#e0e0e0',
                                activeStyle: { backgroundColor: '#d0e4ff' }
                            }
                        }, [
                            e('strong', { key: 'nombre', style: { display: 'block', color: '#222', fontSize: '0.95rem' } }, ruta.nombre),
                            e('span', { key: 'sub', style: { fontSize: '0.8rem', color: '#666' } }, 'Tocar para enfocar mapa')
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