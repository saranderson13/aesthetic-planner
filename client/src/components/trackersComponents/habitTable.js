import React, { Component } from 'react'
import HabitLine from './habitLine'

class HabitTable extends Component {

    state = {
        color: 'none'
    }

    compontentDidMount() {
        this.setState({
            color: this.props.color
        })
    }

    changeBackground = () => {
        if(this.props.color !== this.state.color) {
            this.setState({
                color: this.props.color
            })
        }
    }

    render() {
        return (
            <div 
                className="habitTable"
                style={{ backgroundColor: this.state.color }} 
                onClick={this.changeBackground} >
                    <HabitLine />
                    <HabitLine />
                </div>
        )
    } 

}

export default HabitTable