// STATELESS COMPONENT

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MonthWidgetDay extends Component {

    formatStringDate = (dateString) => {
        // takes in a string such as "2020-02-01" and reformats as "1"
        // avoids timezone conversion by not transating the string to a Date object
        // and takes away any leading zeros
        let date = dateString.split("-")[2]
        date = date[0] === "0" ? date[1] : date
        return date
    }

    setDayDiv = () => {
        const currentPageId = window.location.href.split("/").reverse()[0]
        let divClass = ""
        // DETERMINE CLASS NAME FOR HIGHLIGHTING
        // if today's id has loaded and the current page is for today
        if(!!this.props.currentDayId) {
            if(currentPageId === this.props.currentDayId.toString()) {
                divClass = currentPageId === this.props.day.id.toString() ? "selectedDayHighlight currentDay" : "nonselectedDay"
            } else {
            // if the current page is not for today
                divClass = currentPageId === this.props.day.id.toString() ? "selectedDayHighlight" : "nonselectedDay"
                divClass += this.props.currentDayId === this.props.day.id ? " currentDay" : ""
            }
        }

        return (
            <div 
                key={this.props.day.id} 
                className={divClass} >
                {this.formatStringDate(this.props.day.date)}
            </div>
        )
    }

    render() {
        if (this.props.page === "day-planner") {
        // If the calendar is rendering on a day planner page - all days should have links.
            let dayURL = `/${this.props.page}/${this.props.day.id}`
            return ( <Link to={dayURL}> {this.setDayDiv()} </Link> )
        } else if (this.props.page === "journal" && this.props.day.id <= this.props.currentDayId) {
        // If rendering on a journal page, there should not be links to future days.
            let dayURL = `/${this.props.page}/${this.props.day.id}`

            // Determine whether there should be a link. Days without journals should not have a link.
            // If it is not the current day, and it's a journal page, and an entry for the day being rendered does not have an entry,
            // style with "noJournalEntry" (grey background), and do not include a link
            let noJournal = !!(this.props.day.id !== this.props.currentDayId && this.props.page === "journal" && !this.props.journals.find( j => j.day_id === this.props.day.id ))
            if (noJournal) {
                return (
                    <div 
                        key={this.props.day.id} 
                        className="noJournalEntry" >
                        {this.formatStringDate(this.props.day.date)}
                    </div>
                )
            } else {
            // else, use the #setDayDiv to determine styling.
                return ( <Link to={dayURL}> {this.setDayDiv()} </Link> )
            }
        } else if (this.props.currentDayId === this.props.day.id) {
        // This will apply to the lists and trackers pages - sets styling for current day.
            return (
                <div
                    key={this.props.day.id}
                    className="currentDay" >
                    {this.formatStringDate(this.props.day.date)}
                </div>
            )
        } else {
        // This will apply to future days for the journal page, and ALL days for the tracker and list days
        // Because they will not have links, and aside from styling the current day, will not have styling.
            return (
                <div
                    key={this.props.day.id}
                    className="futureDate" >
                    {this.formatStringDate(this.props.day.date)}
                </div>
            )            
        }
    }

}

export default MonthWidgetDay