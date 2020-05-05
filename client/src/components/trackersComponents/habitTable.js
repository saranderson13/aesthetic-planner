import React, { Component } from 'react'
import HabitLine from './habitLine'

class HabitTable extends Component {

    generateHabitLines = () => {
        return (
            this.props.lines.map( l => {
                return <HabitLine days={l.tracker_days} name={l.name} paintColor={this.props.paintColor} />
            })
        )
    }

    tableTitle = () => {
        return this.props.kind === "habit" ? "Habits" : this.props.kind === "sleep" ? "Sleep" : "Mood"
    }

    render() {
        return (
            <>
            <div>
                Habits
                <button className="addHabitLineButton">Add Line</button>
            </div>
            <div 
                className="habitTable"
                onClick={this.changeBackground} >
                {this.generateHabitLines()}
            </div>
            </>
        )
    } 

}

export default HabitTable