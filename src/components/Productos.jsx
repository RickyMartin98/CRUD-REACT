import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { async } from 'q';

const Productos = function ({producto, setRecargar}) {
    //const { producto } = props;
    const eliminarProducto = id => {
        console.log('eliminado: ',id);
        Swal.fire({
            title: 'are you sure?',
            text:" You won't able to revert it",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const url = `http://localhost:3500/restaurant/${id}`;
                    const resultado = await axios.delete(url);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your item  has been deleted',
                        type: 'success'
                    });
                    setRecargar(true);
                } 
                catch(error) {
                    Swal.fire({
                        text: 'Nothing to delete',
                        type: 'warning'
                    })
                }
               
            }
        });
        
    }
    return(
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <p> {producto.id} .- { producto.nombre}  <span className="font-weight-bold">${ producto.precio }</span></p>
            <div>
                <Link to={`/productos/editar/${ producto.id }`} className="btn btn-success mr-2">Editar</Link>
                <button type="button" className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
        </li>
    );    
}

export default Productos;