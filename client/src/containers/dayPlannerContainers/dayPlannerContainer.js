import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from '../navContainer'
import DayPlannerControlsContainer from './dayPlannerControlsContainer'
import DayPlannerBodyContainer from './dayPlannerBodyContainer'

class DayPlannerContainer extends Component {

    // CONTROLS CONTAINER DIRECTIVES

    // Two buttons:
    //    Add Event
    //    Add Goal
    // When clicked, a form will appear.
    //    Fields for Add Event form:
    //      name
    //      type (timed or untimed)
    //          if timed   >> show start/end fields (for now, must start/end on the hour)
    //          if untimed >> show subtype dropdown selector
    //    Fields for Add Goal Form:
    //      type (day, week, month, year)
    //      content of goal

    // Navigation: 
    //    Arrow buttons to go back and forth between days.
    //    Link to Journal Entry?
    //    A small monthly calendar will have links to jump to specific days too.
    //    Monthly calendar will have nav buttons to jump between months

    // IN THE FUTURE there will also be an add sticker / add washi button
    // Container enters edit mode - all other controls disappear
    // Stickers and Washi options will be drag/droppable onto specific areas of the page.


    // BODY CONTAINER DIRECTIVES

    // Top Bar, Left Side - Holidays, Deadlines, Birthdays
    // Top Bar, Right Side - ex, Saturday, February 22nd, 2020
    // Column 1 - Schedule - timed events broken down by hour
    // Column 2, Box 1 - Daily Goals
    // Column 2, Box 2 - Daily Tasks 

    render() {
        return (
            <>
                <aside id="controlsContainer">
                    <DayPlannerControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><DayPlannerBodyContainer pageName="Day Planner"/></section>
            </>
        )
    }

}

export default DayPlannerContainer