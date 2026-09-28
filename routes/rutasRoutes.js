const express = require('express');
const router = express.Router();
const { obtenerTrazados } = require('../controllers/rutasController');

// Definir la ruta GET para los trazados
router.get('/trazados', obtenerTrazados);

module.exports = router;