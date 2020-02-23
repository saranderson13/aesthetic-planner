import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from '../navContainer'
import ListsControlsContainer from './listsControlsContainer'
import ListsBodyContainer from './listsBodyContainer'

class ListsContainer extends Component {

    // DIRECTIVES
    // Controls Container: (Basically list-edit zone)
    //    Button to add new list
    //    If adding new list, or list is selected, shows the add/edit form.
    // 
    // Body Container:
    //    Shows all lists grid style
    //    Lists are clickable - upon click, they show up in the controls container to be edited

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