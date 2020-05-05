import React, { Component } from 'react'
import HabitLine from './habitLine'

class SleepTable extends Component {

    generateHabitLines = () => {
        return (
            this.props.lines.map( l => {
                return <HabitLine days={l.tracker_days} name={l.name} paintColor={this.props.paintColor} />
            })
        )
    }

    render() {
        return (
            <>
            <div>Sleep</div>
            <div 
                className="habitTable"
                onClick={this.changeBackground} >
                {this.generateHabitLines()}
            </div>
            </>
        )
    } 

}

export default SleepTable