// STATELESS COMPONENT #3

import React from 'react'
import { Link } from 'react-router-dom'

const PageLinks = () => {
    return (
        <div className="pageLinksBar">
            <span><Link to="/day-planner">Day Planner</Link></span> - 
            <span><Link to="/trackers"> Trackers</Link></span> - 
            <span><Link to="/lists"> Lists</Link></span> - 
            <span><Link to="/journal"> Journal</Link></span>
        </div>
    )
}

export default PageLinks