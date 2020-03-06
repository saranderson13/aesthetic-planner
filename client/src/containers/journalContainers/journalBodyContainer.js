import React, { Component } from 'react'
import JournalEntry from '../../components/journalComponents/journalEntry'
// import { connect } from 'react-redux'

class JournalBodyContainer extends Component {

    displayJournal = () => {
        if(this.props.status === "loading") {
            return "loading"
        } else if (this.props.entry) {
            return (
                <JournalEntry 
                    entry={this.props.entry} 
                    content={this.props.content} 
                    formattedDate={this.props.formattedDate} />
            )
        } else {
            // Return input form if current day.
            // Return forbidden submission message for future days.
            // Return no entry message for previous days.
            let message = ""
            if (this.props.futureDate) {
                message = "You may not create a journal for a future date."
            } else if (this.props.pastDate) {
                message="There is no journal present for the selected date."
            } else {
                message="Input form here."
            }
            return (
                <JournalEntry 
                    entry={this.props.entry}
                    content={message}
                    formattedDate={this.props.formattedDate} />
            )
        }
    }

    displayInput = () => {

    }

    render() {
        return (
            <>
                {this.displayJournal()}
            </>
        )
    }

}

export default JournalBodyContainer