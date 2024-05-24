// Importar mysql2
const mysql = require('mysql2');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
connection.connect(error => {
    if (error) throw error;
    console.log("Conexión exitosa a la base de datos");
});

// Exportar la conexión
module.exports = connection;
