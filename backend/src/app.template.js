import express from "express";
import app from "./server.js"; 
import router from "./routes/book.Routes.js";
import cors from 'cors'


// Usar middleware para parsear datos JSON y URL-encoded
const corsOptions = {
    origin: ['YOUR HOST FRONTEND'],// URL de la pagina para que pueda hacer operaciones 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limita los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Limita los encabezados permitidos
    credentials: true // Habilita el uso de credenciales (cookies, encabezados de autorización, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.json("¡Bienvenido al backend!");
});

// Usar el enrutador de libros
app.use("/books", router);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto: http://localhost:${PORT}`);
});
