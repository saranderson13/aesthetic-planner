import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from '../navContainer'
import TrackersControlsContainer from './trackersControlsContainer'
import TrackersBodyContainer from './trackersBodyContainer'

class TrackerContainer extends Component {

    render() {
        return (
            <body>
                <aside id="controlsContainer">
                    <TrackersControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><TrackersBodyContainer pageName="Trackers" /></section>
            </body>
        )
    }

}

export default TrackerContainer