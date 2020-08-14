import React, { Component } from 'react'
import { connect } from 'react-redux'
import HabitLine from './habitLine'
import { addHabitLine as addLine } from '../../actions/trackerActions'
import uuid from 'uuid'

class HabitTable extends Component {

    state = {
        newLineContent: ""
    }

    generateHabitLines = () => {
        if (this.props.lines.length === 0) {
            return (
                <div className="instruction">
                    {"❤ Create your first line"}
                </div>
            )
        } else {
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
    }

    addLine = e => {
        e.preventDefault()
        
        const linePacket = {
            tracker_id: this.props.trackerId,
            name: this.state.newLineContent
        }
        this.props.addLine(linePacket)
        this.setState({newLineContent: ""})
    }

    handleNewLineTitleChange = e => {
        this.setState({ newLineContent: e.target.value })
    }

    render() {
        return (
            <>
            <div className="tableTitleBox">
                Habits
                <form className="addLineForm" onSubmit={e => this.addLine(e)}>
                    <input 
                        type="text" 
                        className="lineTitle" 
                        placeholder="Line Name" 
                        value={this.state.newLineContent}
                        onChange={e => this.handleNewLineTitleChange(e)} />
                    <input 
                        type="submit" 
                        className="addHabitLineButton" 
                        value="Add Line" />
                </form>
            </div>
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

const mapDispatchToProps = dispatch => {
    return ({
        addLine: linePacket => dispatch(addLine(linePacket))
    })
}

export default connect(null, mapDispatchToProps)(HabitTable)
