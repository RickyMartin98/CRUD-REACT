import React, {  useState ,  useRef } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import swal from 'sweetalert2';

const EditarProducto =  function ({ producto, setRecargar, history }) {
    
    const [productoNuevo, setProductoNuevo] = useState({nombre: '', precio: 0, categoria: ''});
    const [error, setError] = useState(false);
    const { id , nombre, categoria, precio } = producto;
    console.log("id recivido es: ",id);
    console.log("nombre recivido es: ",nombre);
    console.log("precio recivido es: ",precio);
    console.log("categoria recivido es: ",categoria);
 
    const nombreRef = useRef('');
    const precioRef = useRef('');

  
   /* useEffect(() => {
        const ConsultarProducto = async () =>  {
            const res = await axios.get(`http://localhost:3500/restaurant/${id}`);
            console.log("res.data: ",res.data);
        }
        ConsultarProducto();
    }, []);*/

    const getCategoria = (e) => {
        console.log([e.target.name],e.target.value);
        setProductoNuevo({...productoNuevo,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value,
            [e.target.name]: [e.target.value]})
    }
    const putProduct = async () => {
    
        console.log("Mi producto a enviar: ",productoNuevo);

        const actualizado = await axios.put(`http://localhost:3500/restaurant/${id}`, {
            nombre: productoNuevo.nombre,
            precio: productoNuevo.precio,
            categoria: productoNuevo.categoria
        });
        swal.fire({
            title: 'Actualizao',
            text: 'Your shit has been actualized',
            type: 'success'
        });
        setRecargar(true);
        history.push('/productos');
       // console.log(actualizado);
    }

    const editarProduct = (e) => {
        e.preventDefault();
        putProduct();
    
    }

     return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            <form  className="mt-5" onSubmit={editarProduct}>
                { (error) ? <Error mensaje="" /> : null }
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input ref={ nombreRef } type="text" className="form-control" name="nombre"  placeholder="Nombre Platillo"   defaultValue={ nombre } />
                </div>
                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input ref={ precioRef }  type="number"  className="form-control"  name="precio" defaultValue={ precio } placeholder="Precio Platillo"/>
                </div>
                <legend className="text-center">Categor&iacute;a:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                         <input className="form-check-input" type="radio" name="categoria"  value="postre" defaultChecked={(categoria === 'postre')} onChange={getCategoria} />
                         <label className="form-check-label">   Postre </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="categoria"  value="bebida" defaultChecked={(categoria === 'bebida')} onChange={getCategoria} />
                        <label className="form-check-label"> Bebida</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" type="radio" name="categoria"  value="cortes" defaultChecked={(producto.categoria === 'cortes')} onChange={getCategoria} />
                        <label className="form-check-label"> Cortes </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="categoria"  value="ensalada" defaultChecked={ (categoria === 'ensalada') } onChange={getCategoria} />
                        <label className="form-check-label"> Ensalada </label>
                    </div>
                </div>
                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto"  />
            </form>
            <h1>Nombre del producto es: {productoNuevo.nombre} </h1>
            <h1>Precio del producto es: {productoNuevo.precio}</h1>
            <h1>Categoria del producto es: {productoNuevo.categoria}</h1>
        </div>
    );
}

export default withRouter(EditarProducto);