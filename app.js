const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 2. Importar las rutas (AQUÍ DEBEN IR TODOS LOS REQUIRES DE RUTAS)
const usuariosRoutes = require('./routes/usuarios.routes'); // Faltaba esta línea
const rutasRoutes = require('./routes/rutasRoutes'); 
const vistasRoutes = require('./routes/vistas'); 

// 3. Montar las rutas en el servidor (DESPUÉS DE IMPORTARLAS)
app.use('/api/usuarios', usuariosRoutes); // Lo movimos aquí abajo
app.use('/api/rutas', rutasRoutes);
app.use('/', vistasRoutes);

// 4. Levantar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor de TuBus corriendo en el puerto ${PORT}`);
});