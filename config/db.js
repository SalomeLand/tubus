
require('dotenv').config();

const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: false, // Cambia a true si usas un servicio cloud como Azure
        trustServerCertificate: true // Evita errores de certificados en desarrollo local
    }
};

// Crear la conexión y ASEGURARSE de retornar el pool
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server exitosamente');
        return pool; // <--- ESTA ES LA LÍNEA CLAVE QUE TE FALTA
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise
};