import React, { Component } from 'react'
import uuid from 'uuid'

class PaletteSquare extends Component {

    render() {
        return(
            <div 
                className="paletteSquare"
                style={{backgroundColor: this.props.color}}
                onClick={e => this.props.changeColor(e)}
                data-hex={this.props.color}
                key={uuid()} >
                
            </div>
        )
    }

}

export default PaletteSquare