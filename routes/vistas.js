const express = require('express');
const router = express.Router();
const vistaController = require('../controllers/vistaController');

// Cuando el usuario entre a midominio.com/app, se ejecuta el controlador
router.get('/app', vistaController.renderizarAppMap);

module.exports = router;