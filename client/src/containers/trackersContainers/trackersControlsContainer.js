import React, { Component } from 'react'
import TrackerPalette from '../../components/trackersComponents/trackerPalette'

class TrackersControlsContainer extends Component {

    render() {
        return (
            <div id="controlsContent">
                <TrackerPalette changeColor={this.props.changeColor.bind(this)} />
            </div>
        )
    }

}

export default TrackersControlsContainer