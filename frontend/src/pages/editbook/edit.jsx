import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './edit.css'

export function Edit({URI}){
    const { id } = useParams();

    //const [error, setError] = useState(false);//error de traer los datos
    const [errors, setErrors] = useState({});//error del formulario
    const [file, setFile] = useState(null);//estado que guarda el objeto de la foto
    const [FormBook, setFormBook] = useState({
        title: '',
        descrip: '',
        price: '',
    });

    const navigate = useNavigate();
    //obtiene los datos
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`${URI}/${id}`);
                setFormBook(res.data);
                setFile(res.data.cover);
            } catch (error) {
                console.error(error)
            }
        }
        fetchBook();
    }, [URI, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormBook({ ...FormBook, [name]: value});
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', FormBook.title);
        formData.append('descrip', FormBook.descrip);
        formData.append('price', FormBook.price);
        formData.append('cover', file);
        
        // Validaciones de campos
        const errors = {};
        if (!FormBook.title) {
            errors.title = 'Debes agregar un título';
        }
        if (!FormBook.descrip) {
            errors.descrip = 'Debes agregar una descripción';
        }
        if (!FormBook.price) {
            errors.price = 'Debes agregar un precio';
        }
        //valida que sea una foto
    if (e.target.cover.files.length > 0) {
        const selectedFile = e.target.cover.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(selectedFile.type)) {
            setErrors({ ...errors, cover: 'Debes agregar una foto válida (JPEG, PNG, JPG)' });
            return;
        }
    } else {
        // Si no se ha seleccionado un nuevo archivo, borrar el error de la portada
        setErrors({ ...errors, cover: '' });
    }

        
        // Si hay errores, se muestran y detiene el envio del formulario
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        //envio del formulario
        try {
            const response = await axios.put(`${URI}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');//vuelve a la pagina principal
        } catch (error) {
            console.error('Error al registrar libro:', error);
            setErrors({ form: 'Error en el envío del formulario' });
        }
    };

    return (
        <div className="bg-form">
            <form onSubmit={handleSubmit}>
                <h1>Agregar un nuevo libro</h1>

                <label htmlFor="titulo">Título</label>
                <input type="text" name="title" placeholder="Título" value={FormBook.title} onChange={handleChange} />
                {errors.title && <div className="field-error">{errors.title}</div>}

                <label htmlFor="desc">Descripción</label>
                <textarea type="text" name="descrip" placeholder="Descripción" value={FormBook.descrip} onChange={handleChange} />
                {errors.descrip && <div className="field-error">{errors.descrip}</div>}

                <label htmlFor="precio">Precio</label>
                <input type="number" name="price" placeholder="Precio" value={FormBook.price} onChange={handleChange} />
                {errors.price && <div className="field-error">{errors.price}</div>}

                <label htmlFor="foto">Foto</label>
                <input type="file" name="cover" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                {errors.cover && <div className="field-error">{errors.cover}</div>}
                <span>Foto actual:</span>
                {file ? (
                    <img src={typeof file === "string" ? `./../img/${file}` : URL.createObjectURL(file)} alt="Foto de portada" />
                ) : null}

                <button>Agregar libro</button>
                {errors.form && <div className="error-message">{errors.form}</div>}
            </form>
        </div>
    );
}