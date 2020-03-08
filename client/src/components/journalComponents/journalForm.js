import React, { Component } from 'react';

export default class JournalForm extends Component {

    state = {
        content: ""
    }

    componentDidMount() {
        if(!!this.props.id) {
            this.setState({ content: this.props.content })
        }
    }

    handleChange = e => {
        this.setState({ content: e.target.value })
    }

    handleSubmit = e => {
        // debugger;
        e.preventDefault()
        const journalPacket = {
            journal: {
                day_id: this.props.dayId,
                content: this.state.content
            }
        }
        if(!!this.props.id) {
            journalPacket["journal"]["id"] = this.props.id
        }
        // console.log(journalPacket)
        debugger
        this.props.forceView()
        this.props.submitJournal(journalPacket, !!this.props.id ? 'PATCH' : 'POST')
    }

    render() {
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