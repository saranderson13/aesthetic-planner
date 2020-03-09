import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'

class JournalControlsContainer extends Component {

    generateRecentEntries = () => {
        return (
            <ul className="recentPostsList">
                {this.props.recentEntries.map( e => {
                    const day = this.props.days.find( d => d.id === e.day_id )
                    const dayObj = new Date(day.date)
                    const prettyDate = this.props.formatDate(dayObj)
                    return (
                        <li key={uuid()} className="recentPost">
                            <div className="entryLink"><Link to={`/journal/${day.id}`}>{prettyDate.slice(0, prettyDate.length - 6)}</Link></div>
                            <div className="contentPreview">{e.content.slice(0, 70)}...</div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {
        const buttonText = this.props.mode === "view" ? "Edit Post" : "Exit Edit Mode"
        if (this.props.inputLegal) {
            return (
                <div id="controlsContent">
                    <button className="customButton journalEditModeButton" onClick={this.props.toggleView}>{buttonText}</button>
                    <div className="recentEntriesHeader">>> Recent Entries</div>
                    {this.generateRecentEntries()}
                </div>
            )
        } else {
            if (this.props.days.length > 0) {
                return (
                    <div id="controlsContent">
                        <div className="recentEntriesHeader">>> Recent Entries</div>
                        {this.generateRecentEntries()}
                    </div>
                ) 
            } else { return "loading"}
        }
    }

}

export default JournalControlsContainer