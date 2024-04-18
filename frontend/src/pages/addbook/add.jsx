import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './add.css'

export function Add({URI}) {
    const [errors, setErrors] = useState({});//estado de error
    const [file, setFile] = useState(null);//estado que guarda el objeto de la foto
    const [FormBook, setFormBook] = useState({
        title: "",
        descrip: "",
        price: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormBook({ ...FormBook, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
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
        if (!file) {
            errors.cover = 'Debes agregar una foto';
        }
        //valida que sea una foto
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!file || !allowedTypes.includes(file.type)) {
            setErrors({ cover: 'Debes agregar una foto válida (JPEG, PNG, JPG)' });
            return;
        }
        
        // Si hay errores, se muestran y detiene el envio del formulario
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        //envio del formulario
        try {
            const response = await axios.post(URI, formData, {
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
                <input type="text" name="title" placeholder="Título" onChange={handleChange} />
                {errors.title && <div className="field-error">{errors.title}</div>}

                <label htmlFor="desc">Descripción</label>
                <textarea type="text" name="descrip" placeholder="Descripción" onChange={handleChange} />
                {errors.descrip && <div className="field-error">{errors.descrip}</div>}

                <label htmlFor="precio">Precio</label>
                <input type="number" name="price" placeholder="Precio" onChange={handleChange} />
                {errors.price && <div className="field-error">{errors.price}</div>}

                <label htmlFor="foto">Foto</label>
                <input type="file" name="cover" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                {errors.cover && <div className="field-error">{errors.cover}</div>}
                
                {file && <img src={URL.createObjectURL(file)} alt="" />}

                <button>Agregar libro</button>
                {errors.form && <div className="error-message">{errors.form}</div>}
            </form>
        </div>
    );
}
