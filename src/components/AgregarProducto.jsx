import React, {  useState } from 'react';
import {withRouter} from 'react-router-dom';
import Error from './Error';
import swal from 'sweetalert2';
import axios from 'axios';
import { async } from 'q';
import Swal from 'sweetalert2';

const AgregarProductos = function ({addProduct, history,guardarRecargar}) {
    const [producto ,setProducto] = useState({nombre: '', precio: 0, categoria:''});
    const [error, setError] = useState(true);

  const datosForm = (datos) => {
       /* console.log(datos.target.value); */   
        console.log(datos.target.name, datos.target.value);
        console.log("error: ", error);
       { (datos.target.value === "") ? setError(true) : setError(false); }
        
        if (datos.target.name === "nombre") {
            if (datos.target.value === '') { setError(true); console.log("error actulizado :",error); }

             console.log("El que disparo el evento es: ", datos.target.name);
             setProducto({...producto,[datos.target.name]: datos.target.value});
        }
        if (datos.target.name === "precio") {
            if (datos.target.value === '') { setError(true); console.log("error actulizado :",error); }
             console.log("El que disparo el evento es: ", datos.target.name);
             setProducto({...producto,[datos.target.name]: datos.target.value});
        }
        if (datos.target.name === "categoria"){
            if(datos.target.value === '') { setError(true);  console.log("error actulizado :",error); }
            console.log("El que disparo el evento es: ", datos.target.name);
            setProducto({...producto,[datos.target.name]: datos.target.value});
        }
        setProducto({...producto,[datos.target.name]: datos.target.value});
    }
    const postProducto = async () => {
        const registro = await axios.post('http://localhost:3500/restaurant', {
            nombre: producto.nombre,
            precio: producto.precio,
            categoria: producto.categoria
        });
        console.log(registro);
        Swal.fire({
            title: 'Created',
            text: ' created successfully',
            type: 'success'
        })
       guardarRecargar(true);
       history.push('/productos');
    }

    const enviarProducto = (e) => {
        e.preventDefault(); //Hace que la aplicación no se refresque.
        console.log('sending....');
        console.log("Event target: ",e.target.name);
        console.log("Este es el producto: ",producto);
        if (nombre === '' || precio === '' || categoria === '' ) {
            setError(true); 
        }
        setError(false);
        if (!error){
            try {
                postProducto();
                alert(guardarRecargar());
                
            }catch(error) {
                Swal.fire({
                    text: error 
    
                })
            }
        }
        console.log("Error final: ",error);
       // addProduct(producto);
    }

    const { nombre , precio, categoria} = producto;

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            <form  className="mt-5" onSubmit={enviarProducto}>
            { (error) ? <Error mensaje="Todos los campos son obligatorios"/> : null}
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input  type="text" className="form-control" name="nombre" onChange={datosForm}  value={nombre} placeholder="Nombre Platillo" />
                </div>
                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input  type="number"  className="form-control"  name="precio" onChange={datosForm} value={precio} placeholder="Precio Platillo"/>
                </div>
                <legend className="text-center">Categor&iacute;a:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                         <input className="form-check-input" type="radio" name="categoria" onChange={datosForm} value="postre"/>
                         <label className="form-check-label">   Postre </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="categoria" onChange={datosForm} value="bebida"/>
                        <label className="form-check-label"> Bebida</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" type="radio" name="categoria" onChange={datosForm} value="cortes" />
                        <label className="form-check-label"> Cortes </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="categoria" onChange={datosForm} value="ensalada"/>
                        <label className="form-check-label"> Ensalada </label>
                    </div>
                </div>
                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto"  />
            </form>
            <h1>Nombre del producto es: {nombre}</h1>
            <h1>Precio del producto es: {precio}</h1>
            <h1>Categoria del producto es: {categoria}</h1>
        </div>
    );
}


export default withRouter(AgregarProductos);