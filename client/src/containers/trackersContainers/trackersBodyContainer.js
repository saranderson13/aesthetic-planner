import React, { Component } from 'react'
import { connect } from 'react-redux'

class TrackersBodyContainer extends Component {

    render() {
        return (
            <h1>{this.props.pageName}</h1>
        )
    }

}

export default TrackersBodyContainer