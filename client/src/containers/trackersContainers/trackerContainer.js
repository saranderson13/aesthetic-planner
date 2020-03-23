import React, { Component } from 'react'
// import { connect } from 'react-redux'

import NavContainer from '../navContainer'
import TrackersControlsContainer from './trackersControlsContainer'
import TrackersBodyContainer from './trackersBodyContainer'

class TrackerContainer extends Component {

    // DIRECTIVES
    // Controls container:
    //    Current Month at the top
    //    Color/Pattern picker to choose which color to fill in boxes with
    //    Statistics
    //      Average sleep
    //      Best habit
    //      A habit to focus on (worst lol but put in an encouraging way)
    //    Month navigation

    // Body Container:
    // The trackers!
    // Basically in three rows - mood, sleep, then habits.
    // For now, just squares for the mood/habits
    // Sleep could be a bar chart with like dots...
    // Habit would have an add line button
    // Boxes are clickable. You would click a color (not patterns yet), then click a box to add the color.
    // Will need a clear color - this will uncheck the boxes. Any color will indicate checked.

    state = {
        chosenColor: "#000"
    }

    render() {
        return (
            <>
                <aside id="controlsContainer">
                    <TrackersControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><TrackersBodyContainer pageName="Trackers" /></section>
            </>
        )
    }

}

export default TrackerContainer