// STATELESS COMPONENT // FUNCTIONAL COMPONENT

import React from 'react'
import { Link } from 'react-router-dom'

const PageLinks = days => {
    
    const getCurrentDayLink = (baseURL, pageName, days) => {
        if (days.days.length > 0) {
            const today = new Date()
            const todayDateString = today.getFullYear().toString() + "-" + ( today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1 ) + "-" + ( today.getDate() < 10 ? "0" + today.getDate() : today.getDate() )
            let currentDayId = (days.days.find( d => d.date === todayDateString).id )
            return (
                <Link to={`${baseURL}/${currentDayId}`}> {pageName} </Link>
            )
        } else {
            return pageName
        }
    }

    return (
        <div className="pageLinksBar">
            <span>{getCurrentDayLink('/day-planner', "Day Planner", days)}</span> - 
            <span><Link to="/trackers"> Trackers</Link></span> - 
            <span><Link to="/lists"> Lists</Link></span> - 
            <span>{getCurrentDayLink('/journal', " Journal", days)}</span>
        </div>
    )
}

export default PageLinks