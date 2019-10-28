import React,{ Fragment } from 'react';
import Productos from './Productos';

const Producto = function (props) {
    const { productos, setRecargar } = props;

    return (
        <Fragment>
            <h1 className="text center">
                Productos
            </h1>
            <ul className="list-group mt-5">
                {productos.map( producto => <Productos 
                    key={producto.id}
                    producto={producto}
                    setRecargar={setRecargar}
                />) }
            </ul>
        </Fragment>
    );
}

export default Producto;