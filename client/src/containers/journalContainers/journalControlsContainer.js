import React, { Component } from 'react'
// import { connect } from 'react-redux'

class JournalControlsContainer extends Component {

    

    render() {
        return (
            <button onClick={this.props.toggleView}>Toggle!</button>
        )
    }

}

export default JournalControlsContainer