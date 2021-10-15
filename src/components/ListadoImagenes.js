import React from 'react';
import Imagen from './Imagen';
import PropTypes from 'prop-types';

const ListadoImagenes = ( { imagenes } ) => {
    return ( 
        <div className="container">
            <div className="row">
                {imagenes.map(imagen => (
                    <Imagen
                        key={imagen.id}
                        imagen={imagen}
                    />
                ))}
            </div>
        </div>
     );
}

ListadoImagenes.propTypes = {
    imagenes: PropTypes.array.isRequired
}

export default ListadoImagenes;