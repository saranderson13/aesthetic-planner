import React, { Component } from 'react';

export default class JournalForm extends Component {

    state = {
        content: ""
    }

    componentDidMount() {
        this.props.setInputMode()
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
        console.log(journalPacket)
        this.props.submitJournal(journalPacket, 'POST')
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                <h3>{this.props.formattedDate}</h3>
                <form id="journalEntryForm" onSubmit={e => this.handleSubmit(e)}>
                    <textarea
                        id="content"
                        className="journalFormTextArea"
                        value={this.state.content}
                        onChange={e => this.handleChange(e)}
                        required />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

}