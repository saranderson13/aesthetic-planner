// STATELESS COMPONENT / FUNCTIONAL COMPONENT

import React from 'react'

const PaletteSquare = props => {

    return(
        <div 
            className="paletteSquare"
            style={{backgroundColor: props.color}}
            onClick={e => props.changeColor(e)}
            data-hex={props.color} >
        </div>
    )

}

export default PaletteSquare