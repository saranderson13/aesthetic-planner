// STATELESS COMPONENT

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class MonthWidgetDay extends Component {

    formatStringDate = (dateString) => {
        // takes in a string such as "2020-02-01" and reformats as "1"
        // avoids timezone conversion by not transating the string to a Date object
        // and takes away any leading zeros
        let date = dateString.split("-")[2]
        date = date[0] === "0" ? date[1] : date
        return date
    }

    

    render() {
        if (this.props.page === "day-planner" || this.props.page === "journal") {
            let dayURL = `/${this.props.page}/${this.props.day.id}`
            return (
                <Link to={dayURL}>
                    <div key={this.props.day.id} style={{backgroundColor: "#ef8"}}>{this.formatStringDate(this.props.day.date)}</div>
                </Link>
            )
        } else {
            return this.formatStringDate(this.props.day.date);
        }
    }

}