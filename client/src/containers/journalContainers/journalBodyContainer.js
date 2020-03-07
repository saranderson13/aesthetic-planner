import React, { Component } from 'react'
import JournalEntry from '../../components/journalComponents/journalEntry'
import JournalForm from '../../components/journalComponents/journalForm'
import JournalMessageBox from '../../components/journalComponents/journalMessageBox'
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
                // this.props.setInputMode()
                return <JournalForm setInputMode={this.props.setInputMode.bind(this)} />
            }
            return (
                <JournalMessageBox
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