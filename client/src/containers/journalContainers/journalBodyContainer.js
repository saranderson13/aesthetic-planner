import React, { Component } from 'react'
import JournalEntry from '../../components/journalComponents/journalEntry'
import JournalForm from '../../components/journalComponents/journalForm'
import JournalMessageBox from '../../components/journalComponents/journalMessageBox'
import LoadingWheel from '../../assets/images/loading-wheel.gif'

class JournalBodyContainer extends Component {

    componentDidUpdate() {
        if(this.props.status !== "loading" && !this.props.entryExists) {
            // Force disable toggle to remove edit button if navigating to current day
            // from a day where editing was legal.
            this.props.disableToggle()
        }
    }

    displayJournal = () => {
        if(this.props.status === "loading") {
            return (
                <div className="journalEntry loadingMod">
                    <img src={LoadingWheel} alt="Loading" />
                </div>
            )
        } else if (!!this.props.entryExists) {
            if(this.props.mode === "view") {
                return (
                    <JournalEntry 
                        entryExists={this.props.entryExists} 
                        content={this.props.content} 
                        formattedDate={this.props.formattedDate} />
                )
            } else {
                return (
                    // Enter Edit Mode
                    <JournalForm
                            entryExists={this.props.entryExists}
                            id={this.props.entryId}
                            dayId={this.props.dayId}
                            content={this.props.content}
                            formattedDate={this.props.formattedDate}
                            forceView={this.props.forceView}
                            enableToggle={this.props.enableToggle}
                            submitEntry={this.props.submitEntry} />
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
                    // New Entry Mode
                    <JournalForm 
                        entryExists={this.props.entryExists}
                        dayId={this.props.dayId}
                        formattedDate={this.props.formattedDate}
                        forceView={this.props.forceView}
                        enableToggle={this.props.enableToggle}
                        submitEntry={this.props.submitEntry} />
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