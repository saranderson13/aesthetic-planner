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
                    formattedDate={this.props.formattedDate} 
                    setViewMode={this.props.setViewMode.bind(this)} />
            )
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
                        setInputMode={this.props.setInputMode.bind(this)}
                        submitJournal={this.props.submitJournal} />
                )
            }
            return (
                <JournalMessageBox
                    content={message}
                    mode={this.props.mode}
                    formattedDate={this.props.formattedDate} 
                    setViewMode={this.props.setViewMode.bind(this)} />
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