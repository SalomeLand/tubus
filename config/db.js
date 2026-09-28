const sql = require('mssql');
require('dotenv').config();

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


const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Conectado exitosamente a SQL Server');
    } catch (error) {
        console.error('Error de conexión a SQL Server:', error);
    }
};

module.exports = {
    sql,
    connectDB
};