import React, { Component } from 'react'
import HabitDay from './habitDay'

class HabitLine extends Component {

    generateDays = () => {
        return (
            this.props.days.map ( d => {
                return <HabitDay 
                    paintColor={this.props.paintColor} 
                    id={d.id}
                    complete={d.complete}
                    nativeColor={d.color} />
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