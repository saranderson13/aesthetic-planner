import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavContainer extends Component {

    render() {
        return (
            <div>
                <span><Link to="/">Day Planner</Link></span> - 
                <span><Link to="/planner">Planners</Link></span> - 
                <span><Link to="/trackers">Trackers</Link></span> - 
                <span><Link to="/lists">Lists</Link></span> - 
                <span><Link to="/journal">Journal</Link></span>
            </div>
        )
    }

}

export default NavContainer