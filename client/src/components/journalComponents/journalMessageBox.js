import React from 'react'

const JournalMessageBox = props => {
    if(props.mode !== "view") {
        props.setViewMode()
    } 

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