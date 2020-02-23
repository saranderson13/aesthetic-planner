import React, { Component } from 'react'
import { connect } from 'react-redux'

class ListsBodyContainer extends Component {

    render() {
        return (
            <h1>{this.props.pageName}</h1>
        )
    }

}

export default ListsBodyContainer