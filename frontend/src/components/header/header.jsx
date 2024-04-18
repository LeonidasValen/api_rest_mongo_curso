import { Link } from "react-router-dom"
import './header.css'

export function Header(){
    return(
        <nav>
            <header className='nav-menu'>
                <h1 className='logo'>LOGO</h1>
                <ul className='items-container'>
                    <li><Link to='/'>Inicio</Link></li>
                    <li><Link to='/add'>Agregar un libro</Link></li>
                </ul>
            </header>
        </nav>
    )
}