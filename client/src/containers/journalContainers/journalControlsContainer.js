import React, { Component } from 'react'
// import { connect } from 'react-redux'

class JournalControlsContainer extends Component {

    

    render() {
        if (this.props.legal) {
            return (
                <button onClick={this.props.toggleView}>Toggle!</button>
            )
        } else {
            return "can't edit"
        }
    }

}

export default JournalControlsContainer