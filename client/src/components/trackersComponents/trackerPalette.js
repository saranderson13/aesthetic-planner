import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPalettes } from '../../actions/trackerActions'
import PaletteSquare from './paletteSquare'
import uuid from 'uuid'

class TrackerPalette extends Component {

    state = {
        chosenPalette: undefined
    }

    componentDidMount() {
        this.props.fetchPalettes()
    }

    componentDidUpdate() {
        if (this.props.palettes.length > 0 && this.state.chosenPalette === undefined) {
            this.setState({ chosenPalette: this.props.palettes[0].id })
        }
    }

    choosePalette = e => {
        const selectedId = parseInt(Array.from(e.target.children).find( c => c.selected ).id, 10)
        if (selectedId !== this.state.chosenPalette) {
            this.setState({ chosenPalette: selectedId })
        }
    }

    generatePaletteOptions = () => {
        if (this.props.palettes.length > 0) {
            return (
                <>
                    {this.props.palettes.map ( p => <option id={p.id} value={p.id} key={uuid()}>{p.name}</option> )}
                </>
            )
        } else {
            return "Loading"
        }
    }

    generatePalette = () => {
        if (!!this.state.chosenPalette) {
            const palette = this.props.palettes.find( p => p.id === this.state.chosenPalette)
            const colors = [
                palette.color_1,
                palette.color_2,
                palette.color_3,
                palette.color_4,
                palette.color_5,
                palette.color_6,
                palette.color_7,
            ]
            return (
                colors.map( c => <PaletteSquare color={c} changeColor={this.props.changeColor.bind(this)} key={uuid()} />)
            )
        } else {
            return "Loading"
        }
    }

    render() {
        return (
            <>
                <select 
                    className="paletteSelector"
                    value={!!this.state.chosenPalette ? this.state.chosenPalette : 0 }
                    onChange={e => this.choosePalette(e)} >
                    {this.generatePaletteOptions()}
                </select>
                <div className="paletteBox">
                    {this.generatePalette()}
                </div>
            </>
        )
    }
    

}


const mapStateToProps = state => {
    return ({
        palettes: state.trackers.palettes,
    })
}

export default connect(mapStateToProps, { fetchPalettes })(TrackerPalette)