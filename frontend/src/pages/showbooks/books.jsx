import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

import './books.css'

export function Books({URI}){
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchBooks = async()=>{
            try {
                const res = await axios.get(URI)
                setBooks(res.data);
                setLoading(false)
                // console.log(res)
            } catch (error) {
                setLoading(false); 
                setError(error); // Manejar errores estableciendo el estado de error
                console.error(error)
            }
        }
        fetchBooks()
    }, [])

    const deleteBook = async (id) => {
        try {
            await axios.delete(`${URI}/${id}`);
            setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    //transforma los precios en pesos
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });

    //Mostrar un mensaje de carga mientras se realiza la solicitud
    if (loading) {
        return <h1>Cargando...</h1>; 
    }
    // Mostrar un mensaje de error si ocurrió algún problema
    if (error) {
        return <h1>Error: {error.message}</h1>; 
    }

    return(
        <section className="shop-content">
            <h1>Tienda de libros</h1>
            <div className="books-shop">
                {books.length > 0 ? (
                    <>
                        {books.map(book => (
                            <article className="book-content" key={`book${book.id}`}>
                                <Link to={`/book/${book.id}`}>
                                    <div className="book-cover">
                                        <img src={`./img/${book.cover}`} alt="" />
                                    </div>
                                    <div className="info-book">
                                        <h2>{book.title}</h2>
                                        <p>{book.descrip}</p>
                                        <span>{formatter.format(book.price)}</span>
                                    </div>
                                </Link>
                                <div className="btn-edit">
                                    <button><Link to={`/edit/${book.id}`}>Editar</Link></button>
                                    <button onClick={() => deleteBook(book.id)}>Borrar</button>
                                </div>
                            </article>
                        ))}
                    </>
                ) : (
                    <h1>No hay libros disponibles</h1>
                )}
            </div>
        </section>
    )
}