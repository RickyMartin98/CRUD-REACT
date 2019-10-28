import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import './App.css';
import Encabezado from './components/Encabezado'; 
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProducto';
import PiedePagina from './components/PiedePagina';
import Productos from './components/Productos';
import Producto from './components/Producto';
import NotFound from './components/NotFound';


function App() {
  const [productos, setProductos] = useState([]);
  const [recargar, setRecargar] = useState(true);
    useEffect( () => {
      if (recargar) {
          const consultarApi = async () => {
          const res = await axios.get('http://localhost:3500/restaurant'); /*Se debe poner la url no el nomrbe del */
          console.log(res.data);
          setProductos(res.data);
        }
        consultarApi();
      }
      setRecargar(false);
    }, [recargar]);

    const addProduct = (producto) => {
      const { nombre, precio , categoria} = producto;
      const newProduct = {
        id: productos.length,
        nombre: nombre,
        precio: precio,
        categoria: categoria
      };
      console.log("Producto recibido:", newProduct);
      setProductos([...productos, newProduct]);
      console.log(productos);

    }

    const getProduct = (props) => {
      const idProducto = parseInt(props.match.params.id);
      const productoEncontrado = productos.filter(producto => (producto.id === idProducto));
      const { nombre } = productoEncontrado;
      console.log("nombre del encontrado: ",nombre);
      console.log("productoEncontrado: ", productoEncontrado.nombre);
      return (
        <EditarProducto producto={productoEncontrado}/>
      );
    }
 
  return (
    <Router>
      <Encabezado />
      <div className="container mt-5">
          <Switch>
              <Route exact path="/productos"   render={ () => (<Producto productos={productos} setRecargar={setRecargar}/>)} />
              <Route exact path="/productos-nuevo/" render={() => (<AgregarProducto addProduct = {addProduct } guardarRecargar={setRecargar} />)} />
              <Route exact path="/productos/:id" render={ ({match}) => ( <Productos /> ) } />
              <Route exact path="/productos/editar/:id" render={ props => {
                const idP = parseInt(props.match.params.id); 
                const founded = productos.filter(produc => produc.id === idP);
                console.log("El founded es: ",founded[0]);
                const { id, nombre, precio, categoria } = founded[0];
            
                console.log("Id is: ",id);
                console.log("Precio es: ",precio);
                console.log("Nombre es: ",nombre);
                console.log("Categoria es: ",categoria);

                return (
                  <EditarProducto producto={ founded[0] } setRecargar={setRecargar} />
                );
              }} />
               <Route render = { () => <NotFound /> }/> 
          </Switch>
      </div>
      <PiedePagina />
    </Router>
  );
}

export default App;
