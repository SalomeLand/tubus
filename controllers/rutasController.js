const { poolPromise, sql } = require('../config/db.js');

// Obtener los trazados de las rutas
const obtenerTrazados = async (req, res) => {
    try {
        const pool = await poolPromise;
        
        const result = await pool.request().query(`
            SELECT id_ruta, nombre, camino.STAsText() AS coordenadas 
            FROM trazado_rutas
        `);
        
        res.json({
            success: true,
            data: result.recordset
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error al obtener los trazados' });
    }
};

module.exports = {
    obtenerTrazados
};