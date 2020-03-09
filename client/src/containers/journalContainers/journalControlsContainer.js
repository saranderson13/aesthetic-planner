import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'

class JournalControlsContainer extends Component {

    generateRecentEntries = () => {
        return (
            <ul>
                {this.props.recentEntries.map( e => {
                    const day = this.props.days.find( d => d.id === e.day_id )
                    const dayObj = new Date(day.date)
                    const prettyDate = this.props.formatDate(dayObj)
                    return (
                        <li key={uuid()}>
                            <div><Link to={`/journal/${day.id}`}>{prettyDate}</Link></div>
                            <div>{e.content.slice(0, 50)}...</div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {
        if (this.props.inputLegal) {
            return (
                <>
                    <button onClick={this.props.toggleView}>Toggle!</button>
                    {this.generateRecentEntries()}
                </>
            )
        } else {
            if (this.props.days.length > 0) {
                return this.generateRecentEntries()
            } else { return "loading"}
        }
    }

}

export default JournalControlsContainer