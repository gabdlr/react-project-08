import { useState, useEffect, Fragment } from 'react';
import Formulario from "./components/Formulario";
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //State de la búsqueda
  const [ busqueda, guardarBusqueda ] = useState("");
  const [ imagenes, guardarImagenes ] = useState([]);
  //States para el paginador
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);

  //Funciones del paginador
  const irPaginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
      if (nuevaPaginaActual < 1) return;
      guardarPaginaActual(nuevaPaginaActual);
  }
  const irPaginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
      if (nuevaPaginaActual > totalPaginas) return;
      guardarPaginaActual(nuevaPaginaActual);
  }

  //Si cambiamos de busqueda reiniciamos la pagina actual a la 1
  //iRock D:
  useEffect(() => {
    if(busqueda === "") return;
    guardarPaginaActual(1);
  }, [busqueda, guardarPaginaActual])

  //useEffect para la busqueda
  useEffect(() => {
    if(busqueda === "") return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = "yourAPIKey";
      const url = 
      `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&image_type=photo&page=${paginaActual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //Calcular el total de paginas
      const totalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(totalPaginas);
      guardarImagenes(resultado.hits);

      //Mover la pantalla hacia arriba
      // const jumbotron = document.querySelector('.jumbotron');
      // jumbotron.scrollIntoView();

    }
    consultarAPI();
  }, [busqueda, paginaActual]);

  return (
    <div className="container mt-3">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario
          guardarBusqueda = {guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center mb-3">
        <ListadoImagenes
        imagenes={imagenes}
        />
        { (totalPaginas === 1) ? 
        null :
        <Fragment>        
          <button 
            type="button" 
            className="btn btn-info mr-1"
            onClick= {irPaginaAnterior}
          >Anterior
          </button>
          <button 
            type="button" 
            className="btn btn-info ml-1"
            onClick={irPaginaSiguiente}
          >Siguiente
          </button> 
      </Fragment>
      }     
      </div>
    </div>
  );
}

export default App;
