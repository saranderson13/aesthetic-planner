// STATELESS COMPONENT // FUNCTIONAL COMPONENT

import React from 'react'
import { Link } from 'react-router-dom'

const PageLinks = props => {

    if (props.currentDayId !== null) {
        return (
            <div className="pageLinksBar">
                <span><Link to={`/day-planner/${props.currentDayId}`}>Day Planner</Link></span> -
                <span><Link to="/trackers"> Trackers</Link></span> - 
                <span><Link to="/lists"> Lists</Link></span> - 
                <span><Link to={`/journal/${props.currentDayId}`}> Journal</Link></span>
            </div>
        )
    } else {
        return (
            <div className="pageLinksBar">
                <span>Day Planner</span> -
                <span><Link to="/trackers"> Trackers</Link></span> - 
                <span><Link to="/lists"> Lists</Link></span> - 
                <span> Journal</span>
            </div>
        )
    }
}

export default PageLinks