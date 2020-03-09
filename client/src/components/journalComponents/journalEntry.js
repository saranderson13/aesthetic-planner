import React from 'react'

const JournalEntry = props => {

    return (
        <div id="journalContainer">
            <div className="journalDate">{props.formattedDate}</div>
            <div className="journalEntry">
                {props.content}
            </div>
        </div>
    )

}

export default JournalEntry