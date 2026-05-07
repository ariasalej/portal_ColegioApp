const mysql = require('mysql2');
require('dotenv').config();

// Verificar variables de entorno
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

// Crear conexión
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'colegiobd'
});

// Conectar
db.connect((err) => {
    if (err) {
        console.error(' Error de conexión a MySQL:', err);
        return;
    }
    console.log('MySQL conectado correctamente');
});

//  PRUEBA AUTOMÁTICA (para confirmar BD correcta)
db.query('SELECT DATABASE() AS db', (err, results) => {
    if (!err) {
        console.log('Base de datos en uso:', results[0].db);
    }
});

module.exports = db;