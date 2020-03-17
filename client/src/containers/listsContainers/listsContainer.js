import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLists } from '../../actions/listsActions'

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

    componentDidMount() {
        this.props.fetchLists()
    }

    render() {
        return (
            <>
                <aside id="controlsContainer">
                    <nav id="navContainer"><NavContainer /></nav>
                    <ListsControlsContainer 
                        lists={this.props.lists} />
                </aside>
                <section id="bodyContainer">
                    <ListsBodyContainer 
                        style={{maxWidth: window.innerWidth - 300}}
                        pageName="Lists" 
                        loading={this.props.loading} 
                        lists={this.props.lists} 
                        resizeBoxes={this.resizeAllListBoxes} />
                </section>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        lists: state.lists.lists,
        loading: state.lists.loading
    }
}

const mapDispatchToProps = dispatch => ({
    fetchLists: () => dispatch(fetchLists())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer)