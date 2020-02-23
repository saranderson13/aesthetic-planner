import React, { Component } from 'react'
import { connect } from 'react-redux'

class JournalBodyContainer extends Component {

    render() {
        return (
            <h1>{this.props.pageName}</h1>
        )
    }

}

export default JournalBodyContainer