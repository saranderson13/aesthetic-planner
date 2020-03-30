import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPalettes } from '../../actions/trackerActions'
import TrackerPalettePicker from './trackerPalettePicker'

class TrackerPalette extends Component {

    state = {
        chosenPalette: undefined
    }

    componentDidMount() {
        this.props.fetchPalettes()
    }

    componentDidUpdate() {
        if (this.props.palettes.length > 0 && this.state.chosenPalette === undefined) {
            this.setState({
                chosenPalette: this.props.palettes[0].id
            })
        }
    }

    choosePalette = e => {
        const selectedId = Array.from(e.target.children).find( c => c.selected ).id
        if (selectedId !== this.state.chosenPalette) {
            this.setState({
                chosenPalette: selectedId
            })
        }
    }

    generatePaletteOptions = () => {
        if (this.props.palettes.length > 0) {
            return (
                <>
                    {this.props.palettes.map ( p => {
                        return (
                            <option id={p.id}>
                                {p.name}
                            </option>
                        )
                    })}
                </>
            )
        } else {
            return "Loading"
        }
    }

    render() {
        console.log(this.state.chosenPalette)
        return (
            <>
                <select 
                    className="paletteSelector"
                    onChange={e => this.choosePalette(e)} >
                    {this.generatePaletteOptions()}
                </select>
                <TrackerPalettePicker />
            </>
        )
    }
    

}

const mapDispatchToProps = dispatch => {
    return ({
        fetchPalettes: () => dispatch(fetchPalettes())
    })
}

const mapStateToProps = state => {
    return ({
        palettes: state.trackers.palettes,
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackerPalette)