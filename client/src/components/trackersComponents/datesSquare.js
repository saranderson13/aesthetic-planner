import React, { Component } from 'react'

class DatesSquare extends Component {

    getWeekday = () => {
        const weekdays = ["U", "M", "T", "W", "R", "F", "S"]
        return weekdays[new Date(this.props.date).getUTCDay()]
    }

    render() {
        return (
            <div className = "dayDateSquare">
                {this.getWeekday()}<br/>{new Date(this.props.date).getUTCDate()}
            </div>
        )   
    }

}

export default DatesSquare