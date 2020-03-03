import React, { Component } from 'react'
// import { connect } from 'react-redux'

class JournalBodyContainer extends Component {

    displayJournal = () => {
        if(this.props.status === "loading") {
            return "loading"
        } else if (this.props.status === "no entry") {
            return `no entry - ${this.props.dayId}`
        } else {
            return this.props.content
        }
    }

    render() {
        return (
            <h1>{this.displayJournal()}</h1>
        )
    }

}

export default JournalBodyContainer