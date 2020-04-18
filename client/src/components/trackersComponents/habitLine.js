import React, { Component } from 'react'
import HabitDay from './habitDay'

class HabitLine extends Component {

    renderDays = () => {
        
    }

    render() {
        return(
        <>
            <div className="habitLine">
                <div className="habitName">
                    Name
                </div>
                <div className="habitDayContainer">
                    <HabitDay />
                    <HabitDay />
                    <HabitDay />
                    <HabitDay />
                    <HabitDay />
                    <HabitDay />
                </div>
            </div>
        </>
        )
    }

}

export default HabitLine