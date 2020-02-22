import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from './universalContainers/navContainer'
import ControlsContainer from './universalContainers/controlsContainer'
import BodyContainer from './universalContainers/bodyContainer'

class PlannerContainer extends Component {

    render() {
        return (
            <body>
                <aside id="controlsContainer">
                    <ControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><BodyContainer pageName="Planners" /></section>
            </body>
        )
    }

}

export default PlannerContainer