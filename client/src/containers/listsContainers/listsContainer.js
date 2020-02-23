import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from '../navContainer'
import ListsControlsContainer from './listsControlsContainer'
import ListsBodyContainer from './listsBodyContainer'

class ListsContainer extends Component {

    render() {
        return (
            <body>
                <aside id="controlsContainer">
                    <ListsControlsContainer />
                    <nav id="navContainer"><NavContainer /></nav>
                </aside>
                <section id="bodyContainer"><ListsBodyContainer pageName="Lists"/></section>
            </body>
        )
    }

}

export default ListsContainer