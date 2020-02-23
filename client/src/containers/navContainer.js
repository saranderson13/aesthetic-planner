import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavContainer extends Component {

    render() {
        return (
            <div>
                <span><Link to="/">Day Planner</Link></span> - 
                <span><Link to="/trackers"> Trackers</Link></span> - 
                <span><Link to="/lists"> Lists</Link></span> - 
                <span><Link to="/journal"> Journal</Link></span>
            </div>
        )
    }

}