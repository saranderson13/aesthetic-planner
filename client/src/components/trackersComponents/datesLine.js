import React, { Component } from 'react'
import DatesSquare from './datesSquare'

class DatesLine extends Component {

    generateDays = () => {
        if(this.props.days === "Loading") {
            return <div className="datesLine">Loading Dates</div>
        } else {
            return (
                this.props.days.map ( d => {
                    return <DatesSquare 
                        id={d.id}
                        key={d.id}
                        date={d.date} />
                })
            )
        }
    }

    render() {
        return(
        <>
            <div className="datesLine" >
                <div className="habitName"></div>
                <div className="dayDatesContainer">
                    {this.generateDays()}
                </div>
            </div>
        </>
        )
    }

}

export default DatesLine