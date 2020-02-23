import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from '../navContainer'
import DayPlannerControlsContainer from './dayPlannerControlsContainer'
import DayPlannerBodyContainer from './dayPlannerBodyContainer'

class DayPlannerContainer extends Component {

    render() {
        return (
            <body>
                <aside id="controlsContainer">
                    <DayPlannerControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><DayPlannerBodyContainer pageName="Day Planner"/></section>
            </body>
        )
    }

}

export default DayPlannerContainer