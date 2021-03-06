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
                        userId={this.props.userId}
                        createOrUpdate={this.props.createOrUpdate} 
                        submitName={"Create List"} 
                        back={this.backButton.bind(this)} />
                </div>
            )
        } else if (this.state.editToggled === true) {
            return(
                <div id="controlsContent">
                    <ListForm 
                        userId={this.props.userId}
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
                            className="customButton listFormStartButton"
                            onClick={this.toggleAdd.bind(this)} >
                            Add List
                        </button>
                        <button 
                            className="customButton listFormStartButton"
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

const mapStateToProps = state => {
    return ({
        userId: state.user.user_id
    })
}

const mapDispatchToProps = dispatch => ({
    createOrUpdate: (listPacket, method) => dispatch(createOrUpdateList(listPacket, method)),
    deleteList: infoPacket => dispatch(deleteList(infoPacket)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListsControlsContainer)