import React, { useState } from 'react'
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ( { guardarBusqueda } ) => {

    //state
    const [ palabraBusqueda, guardarPalabraBusqueda ] = useState("");
    const [ error , guardarError ] = useState(false);

    //Pasar la palabra de búsqueda al elemento principal
    const buscarImagenes = e => {
        e.preventDefault();

        //validar
        if(palabraBusqueda.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarBusqueda(palabraBusqueda)
    }
    return ( 
        <form
            onSubmit = {buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="Busca una imagen, ejemplo fútbol o café..."
                        onChange = { e => guardarPalabraBusqueda(e.target.value) } 
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block" 
                        value="Buscar"
                    />
                </div>
            </div>
            { error ? 
            <Error
                mensaje = "Debes ingresar algo en la búsqueda"
            />
             : null }
        </form>
     );
}

Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired
}

export default Formulario;