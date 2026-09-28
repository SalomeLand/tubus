// controllers/usuarios.controller.js
const { sql } = require('../config/db.js');

const obtenerUsuarios = async (req, res) => {
    try {
        const result = await sql.query`SELECT id, nombre, email, rol FROM usuarios`;
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`SELECT id, nombre, email, rol FROM usuarios WHERE id = ${id}`;
        if (result.recordset.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearUsuario = async (req, res) => {
    const { nombre, email, password_hash, rol } = req.body;
    try {
        const userRol = rol || 'usuario';
        const result = await sql.query`
            INSERT INTO usuarios (nombre, email, password_hash, rol) 
            OUTPUT INSERTED.id 
            VALUES (${nombre}, ${email}, ${password_hash}, ${userRol})
        `;
        res.status(201).json({ id: result.recordset[0].id, nombre, email, rol: userRol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password_hash, rol } = req.body;
    try {
        const result = await sql.query`
            UPDATE usuarios 
            SET nombre = ${nombre}, email = ${email}, password_hash = ${password_hash}, rol = ${rol} 
            WHERE id = ${id}
        `;
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`DELETE FROM usuarios WHERE id = ${id}`;
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};