import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from '../navContainer'
import JournalControlsContainer from './journalControlsContainer'
import JournalBodyContainer from './journalBodyContainer'

class JournalContainer extends Component {

    render() {
        return (
            <body>
                <aside id="controlsContainer">
                    <JournalControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><JournalBodyContainer pageName="Journal"/></section>
            </body>
        )
    }

}

export default JournalContainer