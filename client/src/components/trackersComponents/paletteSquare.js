import React, { Component } from 'react'

class PaletteSquare extends Component {

    render() {
        return(
            <div 
                className="paletteSquare"
                style={{backgroundColor: this.props.color}}
                onClick={e => this.props.changeColor(e)}
                data-hex={this.props.color} >
            </div>
        )
    }

}

export default PaletteSquare