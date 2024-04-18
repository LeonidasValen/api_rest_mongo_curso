import db from 'mysql2/promise'
import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

//crea una nueva conexion con la base de datos y se cierra manualmente. (solo para paginas pocas concurrida y poca solicitud con la base de datos)
// const connection = await db.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASS,
//     database: process.env.DATABASE
// })
// conection.connect(function(error) {
//     if (error) {
//       throw error;
//     } else {
//       console.log('Conexión exitosa');
//     }
//   });

//crea conexiones reutilizables osea conexiones abiertas debe ser configurado al cerrada. (nesesario en paginas de alta concurrencia sin la manera mas optimizada sin tener que estar abriendo y cerrando la base de datos)
const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    connectionLimit: parseInt(process.env.DB_LIMIT)
})

pool.getConnection((error, connection) => {
    if (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    } else {
        console.log('Conexión exitosa');
        connection.release(); // Liberar la conexión de vuelta al pool
    }
});

export default pool 