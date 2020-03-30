import React, { Component } from 'react'
import TrackerPalette from '../../components/trackersComponents/trackerPalette'
// import { connect } from 'react-redux'

class TrackersControlsContainer extends Component {

    render() {
        return (
            <div id="controlsContent">
                <TrackerPalette />
            </div>
        )
    }

}

export default TrackersControlsContainer