const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Importar rutas
const rutasRoutes = require('./routes/rutasRoutes');

// Usar rutas (Todas las rutas de rutasRoutes empezarán con /api/rutas)
app.use('/api/rutas', rutasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor de TuBus corriendo en el puerto ${PORT}`);
});