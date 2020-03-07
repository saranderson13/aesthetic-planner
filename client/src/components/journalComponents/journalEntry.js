import React from 'react'

const JournalEntry = props => {
    return (
        <div>
            <h3>{props.formattedDate}</h3>
            <div>
                
                {props.content}
            </div>
        </div>
    )

}

export default JournalEntry