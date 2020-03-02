import React, { Component } from 'react'
import NavContainer from '../navContainer'
import JournalControlsContainer from './journalControlsContainer'
import JournalBodyContainer from './journalBodyContainer'

class JournalContainer extends Component {

    // DIRECTIVES
    // Controls container has options for a view mode or input mode.
    // Below that is navigation to view specific entries
    // In the body, by default you view the journal entry for the current day, 
    // or a suggestion to add an entry if one does not exist
    // In input mode, you see a text area (maybe with a preview on the side?)
    // By selecting other entries in the controls container, you view them in the body.

    render() {
        return (
            <>
                <aside id="controlsContainer">
                    <JournalControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><JournalBodyContainer pageName="Journal"/></section>
            </>
        )
    }

}

export default JournalContainer