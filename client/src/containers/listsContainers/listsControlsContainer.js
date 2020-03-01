import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListForm from '../../components/listsComponents/listForm'
import { fetchLists, createOrUpdateList, deleteList } from '../../actions/listsActions';

class ListsControlsContainer extends Component {
    
    // Add list button
    // When clicked, create form appears.
    
    // Edit list button
    // When clicked, dropdown of lists appears
    // When one is selected, edit form appears

    state = {
        addToggled: false,
        editToggled: false
    }

    componentDidMount() {
        this.props.fetchLists()
    }

    toggleAdd() {
        this.setState({
            addToggled: true,
            editToggled: false
        })
    }

    toggleEdit() {
        this.setState({
            addToggled: false,
            editToggled: true
        })
    }

    backButton() {
        this.setState({
            addToggled: false,
            editToggled: false
        })
    }

    determineDisplay() {

        if ( this.state.addToggled === true ) {
            return(
                <ListForm 
                    createOrUpdate={this.props.createOrUpdate} 
                    submitName={"Create List"} 
                    back={this.backButton.bind(this)} />
            )
        } else if (this.state.editToggled === true) {
            return(
                <ListForm 
                    createOrUpdate={this.props.createOrUpdate} 
                    deleteList={this.props.deleteList}
                    submitName={"Edit List"} 
                    back={this.backButton.bind(this)} 
                    lists={this.props.lists} />
            )
        } else {
            return (
                <>
                    <button onClick={this.toggleAdd.bind(this)}>Add List</button>
                    <button onClick={this.toggleEdit.bind(this)}>Edit List</button>
                </>
            )
        }
    }

    render() {
        return (
            this.determineDisplay()
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
    createOrUpdate: (listPacket, method) => dispatch(createOrUpdateList(listPacket, method)),
    deleteList: id => dispatch(deleteList(id)),
    fetchLists: () => dispatch(fetchLists())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListsControlsContainer)