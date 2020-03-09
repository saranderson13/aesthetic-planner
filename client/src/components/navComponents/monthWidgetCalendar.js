// STATELESS COMPONENT

import React, { Component } from 'react';
import uuid from 'uuid'
import MonthWidgetDay from './monthWidgetDay'

export default class MonthWidgetCalendar extends Component {

    breakMonthIntoWeeks = (month) => {
        // returns an array of objects with their day numbers as keys, and date numbers as values
        const weeks = []

        // Create an array of six empty objects
        // keys refer to days of the week, Sunday being 0
        for (let i = 0; i < 6; i++) {
            weeks.push({ 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null })
        }

        // Get all days from the month into an array and reverse the order
        // This puts the first day of the month last in the array
        // Days can be popped off instead of unshifted - improves optimization
        const days = [...month.days].reverse()

        // For each week in the week array, assign dates to the appropriate day keys
        for (let i = 0; i < weeks.length; i++) {
            if (i === 0) {
                // For week 1 start date must be calculated
                let startDay = new Date(days[days.length - 1].date).getUTCDay()

                // Because calendar starts on Monday, Sunday would go in index 6 instead of index 0
                // All other days need to be downshifted 1
                let index = startDay === 0 ? 6 : startDay - 1
                
                while (index < 7) {
                    weeks[i][index] = days.pop(new Date(days[days.length - 1]))
                    index += 1
                }
            } else {
                // For all other weeks - index will always start at 0
                let index = 0;
                while (index < 7) {
                    weeks[i][index] = days.pop(new Date(days[days.length - 1]))
                    // if there are no more days to assign, break the loop
                    if (days.length === 0) { break; }
                    index += 1
                }
            }
        }
        return weeks
    }

    generateCalendarRows = () => {
        // returns an array of arrays for each week containing <td>'s for each day
        // only returns a sixth row if necessary
        // does not show surrounding dates; empty <td>'s contain empty strings.
        const weeks = this.breakMonthIntoWeeks(this.props.month);
        const rows = []
        let rowVals = []
        
        // Create the first row, which sould just have the days of the week.
        const days = ["M", "T", "W", "R", "F", "S", "U"]
        rows.push(days.map( d => <th key={d} >{d}</th> ))
        
        // For every object in the weeks array, create a row of <td>'s one for each day. 
        for (let i = 0; i < weeks.length; i++) {
            // this prevents it from populating a blank week. (if all values are null, don't run.)
            // that would only ever happen with the last week
            if (!Object.values(weeks[i]).every( val => val == null)) {
                rowVals = []
                for (let n = 0; n < 7; n++){
                    // for a day outside of the month, push a blank string
                    if(weeks[i][n] === null){
                        rowVals.push("")
                    } else {
                    // for a real day, create a MonthWidgetDay component.
                        rowVals.push(
                            <MonthWidgetDay 
                                day={weeks[i][n]} 
                                page={this.props.page} 
                                currentDayId={this.props.currentDayId} 
                                journals={this.props.journals} />
                        )
                    }
                }
                // push the array of day objects into the rows array.
                rows.push(rowVals.map( d => <td key={ d === "" ? uuid() : d.props.day.id}>{d}</td> ))
            }
        }
        return rows
    }

    render() {
        return (
            <table>
                <tbody>
                    {/* Render each row */}
                    {this.generateCalendarRows().map( r => { return <tr key={uuid()}>{r}</tr> })}
                </tbody>
            </table>
        )
    }

}

