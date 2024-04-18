import express from "express";
import pool from "../../db/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();
// Configuracion para que multer guarde los archivos en un directorio
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./../frontend/public/img")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//verifica que sean iamgenes antes de guardar
function fileFilter(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error("Tipo de archivo no admitido"), false); // Rechazar el archivo
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter // Agregar el filtro de archivos
});

// Ruta para obtener todos los libros
router.get("/", async (req, res) => {
    try {
        const q = "SELECT * FROM book";
        const [data, fields] = await pool.query(q);
        if (data.length === 0) {
            return res.status(204).end(); // No hay contenido para enviar
        }
        return res.json(data);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

//Ruta para obtener libro por id
router.get("/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const q = `SELECT * FROM book WHERE id = ?`;
        const [data, fields] = await pool.query(q, [bookId]);
        if (data.length === 0) {
            return res.status(204).end(); // No hay contenido para enviar
        }
        return res.json(data[0]);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para agregar un nuevo libro
router.post("/", upload.single('cover'), async (req, res) => {
    try {
        const { title, descrip, price } = req.body;
        const cover = req.file.filename; // Nombre del archivo de imagen en el sistema de archivos

        if (!title || !descrip || !price || !cover) {
            return res.status(400).json({ error: "Se requieren todos los campos" });
        }

        const q = "INSERT INTO book (title, descrip, price, cover) VALUES (?, ?, ?, ?)";
        await pool.query(q, [title, descrip, price, cover]);

        return res.status(201).json({ message: "Libro insertado correctamente" });
    } catch (error) {
        console.error("Error al insertar el libro:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put("/:id", upload.single('cover'), async (req, res) => {
    try {
        const bookId = req.params.id;
        const { title, descrip, price } = req.body;

        // Verificar si se adjuntó una nueva imagen
        let cover = null;
        if (req.file) {
            cover = req.file.filename;
        }

        // Verificar si se proporcionaron todos los campos necesarios
        if (!title || !descrip || !price) {
            return res.status(400).json({ error: "Se requieren todos los campos" });
        }

        // Actualizar la entrada en la base de datos solo si se proporciona una nueva imagen
        let q, queryParams;
        if (cover) {
            q = "UPDATE book SET title=?, descrip=?, price=?, cover=? WHERE id = ?";
            queryParams = [title, descrip, price, cover, bookId];
        } else {
            q = "UPDATE book SET title=?, descrip=?, price=? WHERE id = ?";
            queryParams = [title, descrip, price, bookId];
        }

        await pool.query(q, queryParams);

        return res.status(201).json({ message: "Libro actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

//ruta para borrar
router.delete("/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const q = `DELETE FROM book WHERE id = ?`; // Corrección: eliminar el asterisco (*) y usar la sintaxis correcta de DELETE
        const [data, fields] = await pool.query(q, [bookId]);
        if (data.affectedRows === 0) { // Utiliza affectedRows para verificar si se eliminó alguna fila
            return res.status(204).end(); // No hay contenido para enviar
        }
        return res.json({ message: "Libro eliminado exitosamente" });
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});


export default router;
