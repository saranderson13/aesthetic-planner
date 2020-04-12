import React, { Component } from 'react'

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
                    Table
                </div>
        )
    } 

}

export default HabitTable