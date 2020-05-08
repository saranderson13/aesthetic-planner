import React, { Component } from 'react';

export default class JournalForm extends Component {

    state = {
        content: ""
    }

    componentDidMount() {
        // If entering edit mode instead of create mode, set the existing content
        // to state so that it populates in the form.
        if(!!this.props.id) {
            this.setState({ content: this.props.content })
        }
    }

    componentDidUpdate(prevprops) {
        // Clears content in text area if navigating to current day without post
        // from previous day while in edit mode.
        if(prevprops.entry === true && this.props.entry === false) {
            this.setState({ content: "" })
        }
    }

    handleChange = e => {
        this.setState({ content: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const journalPacket = {
            journal: {
                day_id: this.props.dayId,
                content: this.state.content
            }
        }
        // Add the journal id to the packet if in edit mode
        if(!!this.props.id) {
            journalPacket["journal"]["id"] = this.props.id
        }
        // Set the view back to view mode
        this.props.forceView()
        // Set the toggleInput to legal
        this.props.enableToggle()
        this.props.submitJournal(journalPacket, !!this.props.id ? 'PATCH' : 'POST')
    }

    render() {
        return (
            <div id="journalContainer">
                <div className="journalDate">{this.props.formattedDate}</div>
                <form id="journalEntryForm" onSubmit={e => this.handleSubmit(e)}>
                    <textarea
                        id="content"
                        className="journalFormTextArea"
                        value={this.state.content}
                        onChange={e => this.handleChange(e)}
                        required />
                    <input className="customButton journalSubmitButton" type="submit" value="Submit" />
                </form>
            </div>
        )
    }

}