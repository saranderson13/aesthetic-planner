import React from 'react'

const JournalMessageBox = props => {
    return (
        <div>
            <h3>{props.formattedDate}</h3>
            <div>
                
                {props.content}
            </div>
        </div>
    )

}

export default JournalMessageBox