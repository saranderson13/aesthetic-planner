import React from 'react'

const JournalMessageBox = props => {
    return (
        <div>
            <div className="journalDate">{props.formattedDate}</div>
            <div className="journalEntry">
                Warning: {props.content}
            </div>
        </div>
    )

}

export default JournalMessageBox