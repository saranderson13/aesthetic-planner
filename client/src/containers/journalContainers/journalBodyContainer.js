import React, { Component } from 'react'
import JournalEntry from '../../components/journalComponents/journalEntry'
import JournalForm from '../../components/journalComponents/journalForm'
import JournalMessageBox from '../../components/journalComponents/journalMessageBox'

class JournalBodyContainer extends Component {

    displayJournal = () => {
        console.log(this.props.mode)
        if(this.props.status === "loading") {
            return "loading"
        } else if (this.props.entry) {
            if(this.props.mode === "view") {
                return (
                    <JournalEntry 
                        entry={this.props.entry} 
                        content={this.props.content} 
                        formattedDate={this.props.formattedDate} />
                )
            } else {
                return (
                    <JournalForm 
                            dayId={this.props.dayId}
                            formattedDate={this.props.formattedDate}
                            submitJournal={this.props.submitJournal} />
                )
            }
        } else {
            let message = ""
            if (this.props.futureDate) {
                // Return forbidden submission message for future days.
                // Cannot nav to this from cal widget - only by manually entering url
                message = "You may not create a journal for a future date."
            } else if (this.props.pastDate) {
                // Return no entry message for previous days.
                // Cannot nav to this from cal widget - only by manually entering url
                message="There is no journal present for the selected date."
            } else {
                // Return input form if current day.
                return (
                    <JournalForm 
                        dayId={this.props.dayId}
                        formattedDate={this.props.formattedDate}
                        submitJournal={this.props.submitJournal} />
                )
            }
            return (
                <JournalMessageBox
                    content={message}
                    formattedDate={this.props.formattedDate} />
            )
        }
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