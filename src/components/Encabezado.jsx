import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const Encabezado = function (data) {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <div className="container">
                 
                <Link to="/productos" className="navbar-brand">
                <img src={logo} alt="milogo" style={style}/>
                    React CRUD
                </Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/productos" className="nav-link" activeclassname="active"> Productos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/productos-nuevo" className="nav-link" activeclassname="active"> Agregar Producto </Link>
                    </li>
                </ul>
             </div>

           </nav>
}
const style = {
    width: 50,
    height: 50
};

export default Encabezado;


