import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListForm from '../../components/listsComponents/listForm'
import { createOrUpdateList, deleteList } from '../../actions/listsActions';

class ListsControlsContainer extends Component {
    
    // Add list button
    // When clicked, create form appears.
    
    // Edit list button
    // When clicked, dropdown of lists appears
    // When one is selected, edit form is populated

    state = {
        addToggled: false,
        editToggled: false
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
                <div id="controlsContent">
                    <ListForm 
                        createOrUpdate={this.props.createOrUpdate} 
                        submitName={"Create List"} 
                        back={this.backButton.bind(this)} />
                </div>
            )
        } else if (this.state.editToggled === true) {
            return(
                <div id="controlsContent">
                    <ListForm 
                        createOrUpdate={this.props.createOrUpdate} 
                        deleteList={this.props.deleteList}
                        submitName={"Edit List"} 
                        back={this.backButton.bind(this)} 
                        lists={this.props.lists} />
                </div>
            )
        } else {
            return (
                <div id="controlsContent">
                    <div className="listFormStartButtonsContainer">
                        <button 
                            className="listFormStartButton"
                            onClick={this.toggleAdd.bind(this)} >
                            Add List
                        </button>
                        <button 
                            className="listFormStartButton"
                            onClick={this.toggleEdit.bind(this)} >
                            Edit List
                        </button>
                    </div>
                </div>
            )
        }
    }

    render() {
        return this.determineDisplay()
    }

}

const mapDispatchToProps = dispatch => ({
    createOrUpdate: (listPacket, method) => dispatch(createOrUpdateList(listPacket, method)),
    deleteList: id => dispatch(deleteList(id)),
})

export default connect(null, mapDispatchToProps)(ListsControlsContainer)