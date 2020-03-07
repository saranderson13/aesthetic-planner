// STATELESS COMPONENT

import React, { Component } from 'react';
import uuid from 'uuid'
import MonthWidgetDay from './monthWidgetDay'

export default class MonthWidgetCalendar extends Component {

    breakMonthIntoWeeks = (month) => {
        // returns an array of objects with their day numbers as keys, and date numbers as values
        const weeks = []
        for (let i = 0; i < 6; i++) {
            weeks.push({ 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null })
        }
        const days = [...month.days].reverse()
        for (let i = 0; i < weeks.length; i++) {
            if (i === 0) {
                let startDay = new Date(days[days.length - 1].date).getDay()
                let index = startDay === 0 ? 6 : startDay
                while (index < 7) {
                    weeks[i][index] = days.pop(new Date(days[days.length - 1]))
                    index += 1
                }
            } else {
                let index = 0;
                while (index < 7) {
                    weeks[i][index] = days.pop(new Date(days[days.length - 1]))
                    if (days.length === 0) { break; }
                    index += 1
                }
            }
        }
        return weeks
    }

    generateCalendarRows = () => {
        // returns an array of an array for each week containing <td>'s for each day
        // only returns a sixth row if necessary
        // does not show surrounding dates; empty <td>'s contain empty strings.
        const weeks = this.breakMonthIntoWeeks(this.props.month);
        const rows = []
        let rowVals = []

        const days = ["M", "T", "W", "R", "F", "S", "U"]
        rows.push(days.map( d => <th key={d} >{d}</th> ))
        
        for (let i = 0; i < weeks.length; i++) {
            if (!Object.values(weeks[i]).every( val => val == null)) {
                rowVals = []
                for (let n = 0; n < 7; n++){
                    rowVals.push(weeks[i][n] == null ? "" : <MonthWidgetDay day={weeks[i][n]} page={this.props.page} currentDayId={this.props.currentDayId} journals={this.props.journals} /> )
                }
                rows.push(rowVals.map( d => <td key={ d === "" ? uuid() : d.props.day.id}>{d}</td> ))
            }
        }
        return rows
    }

    render() {
        return (
            <table>
                <tbody>
                    {this.generateCalendarRows().map( r => { return <tr key={uuid()}>{r}</tr> })}
                </tbody>
            </table>
        )
    }

}

