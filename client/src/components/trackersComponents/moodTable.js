import React, { Component } from 'react'
import HabitLine from './habitLine'
import uuid from 'uuid'

class MoodTable extends Component {

    generateHabitLines = () => {
        return (
            this.props.lines.map( l => {
                return (
                    <HabitLine 
                        key={uuid()}
                        days={l.tracker_days} 
                        name={l.name} 
                        paintColor={this.props.paintColor} />
                )
            })
        )
    }

    render() {
        return (
            <>
            <div>MOOD</div>
            <div 
                className="habitTable"
                onClick={this.changeBackground} >
                {this.props.generateDatesLine()}
                {this.generateHabitLines()}
            </div>
            </>
        )
    } 

}

export default MoodTable