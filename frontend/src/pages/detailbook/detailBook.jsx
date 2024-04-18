import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

import './detailBook.css'

export function DetailsProductoc({ URI }) {
    const { id } = useParams();// obtiene el id de la url
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`${URI}/${id}`);
                setBook(res.data);
                setLoading(false)
            } catch (error) {
                setLoading(false); 
                setError(error); // Manejar errores estableciendo el estado de error
                console.error(error)
            }
        }
        fetchBook();
    }, [URI, id]);

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });
    
    if (loading) {
        return <h1>Cargando...</h1>; 
    }

    if (error) {
        return <h1>Error: {error.message}</h1>; 
    }

    return (
        <div className="book-container">
            <div className="cover-details">
                <img src={`./../img/${book.cover}`} alt="" />
            </div>
            <div className="detail-info">
                <h1>{book.title}</h1>
                <p>{book.descrip}</p>
                <span>Precio: {formatter.format(book.price)}</span>
            </div>

        </div>
    )
}
