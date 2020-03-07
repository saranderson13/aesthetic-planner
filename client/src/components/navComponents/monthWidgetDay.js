import React, { Component } from 'react';
import { connect } from 'react-redux';
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

        // if today's id has loaded and the current page is for today
        if(!!this.props.currentDayId) {
            // let noJournal = !!(this.props.page === "journal" && !this.props.journals.find( j => j.day_id === this.props.day.id ))
            if(currentPageId === this.props.currentDayId.toString()) {
                divClass = currentPageId === this.props.day.id.toString() ? "selectedDayHighlight currentDay" : "nonselectedDay"
            } else {
            // if the current page is not for today
                divClass = currentPageId === this.props.day.id.toString() ? "selectedDayHighlight" : "nonselectedDay"
                divClass += this.props.currentDayId === this.props.day.id ? " currentDay" : ""
            }

            console.log(divClass)
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
            let dayURL = `/${this.props.page}/${this.props.day.id}`
            return ( <Link to={dayURL}> {this.setDayDiv()} </Link> )
        } else if (this.props.page === "journal" && this.props.day.id <= this.props.currentDayId) {
            let dayURL = `/${this.props.page}/${this.props.day.id}`
            let noJournal = !!(this.props.day.id != this.props.currentDayId && this.props.page === "journal" && !this.props.journals.find( j => j.day_id === this.props.day.id ))
            if (noJournal) {
                console.log("day with no entry")
                return (
                    <div 
                        key={this.props.day.id} 
                        className="noJournalEntry" >
                        {this.formatStringDate(this.props.day.date)}
                    </div>
                )
            } else {
                return ( <Link to={dayURL}> {this.setDayDiv()} </Link> )
            }
        } else {
            return this.formatStringDate(this.props.day.date);
        }
    }

}

export default MonthWidgetDay