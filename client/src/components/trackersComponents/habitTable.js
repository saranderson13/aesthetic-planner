import React, { Component } from 'react'
import { connect } from 'react-redux'
import HabitLine from './habitLine'

class HabitTable extends Component {

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
            <div className="tableTitleBox">
                HABITS
                <form className="addLineForm">
                    <input type="text" className="lineTitle" placeholder="Line Name" />
                    <input type="submit" className="addHabitLineButton" value="Add Line" />
                </form>
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

const mapDispatchToProps = dispatch => {
    return ({
        
    })
}

const mapStateToProps = state => {
    return ({

    })
}

export default connect(null, null)(HabitTable)

// export default HabitTable