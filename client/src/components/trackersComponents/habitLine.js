import React, { Component } from 'react'
import HabitDay from './habitDay'

class HabitLine extends Component {

    generateDays = () => {
        console.log(this)
        return (
            this.props.days.map ( d => {
                return <HabitDay color={this.props.color} id={d.id} />
            })
        )
    }

    render() {
        return(
        <>
            <div className="habitLine" >
                <div className="habitName">{this.props.name}</div>
                <div className="habitDayContainer">
                    {this.generateDays()}
                </div>
            </div>
        </>
        )
    }

}

export default HabitLine