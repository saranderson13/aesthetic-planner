import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { fetchPalettes } from '../../actions/trackerActions'
import NavContainer from '../navContainer'
import TrackersControlsContainer from './trackersControlsContainer'
import TrackersBodyContainer from './trackersBodyContainer'
import UserControls from '../../components/navComponents/userControls'

class TrackerContainer extends Component {

    // DIRECTIVES
    // Controls container:
    //    Contains color palette selector
    //    & Color picker
    // 
    // 
    // 
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
        paintColor: 'transparent'
    }

    changeColor = e => {
        if (e.target.dataset.hex !== this.state.paintColor) {
            this.setState({ paintColor: e.target.dataset.hex })
        }
    }

    render() {
        return (
            <>
                <aside id="controlsContainer">
                    <nav id="navContainer">
                        <NavContainer 
                            pageName="trackers" 
                            monthId={this.props.match.params.monthId} />
                    </nav>
                    <TrackersControlsContainer changeColor={this.changeColor.bind(this)} />
                    <div id="userControlsBar">
                        <UserControls />
                    </div>
                </aside>
                <section id="bodyContainer">
                    <TrackersBodyContainer 
                        pageName="trackers" 
                        monthId={this.props.match.params.monthId} 
                        paintColor={this.state.paintColor} />
                </section>
            </>
        )
    }

}

export default TrackerContainer