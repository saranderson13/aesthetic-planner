import React, { Component } from 'react'
import HabitLine from './habitLine'

class HabitTable extends Component {

    generateHabitLines = () => {
        return (
            this.props.lines.map( l => {
                console.log(l)
                return <HabitLine days={l.tracker_days} name={l.name} color={this.props.color} />
            })
        )
    }

    render() {
        return (
            <>
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