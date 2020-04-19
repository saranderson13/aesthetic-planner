import React, { Component } from 'react'

export default class HabitDay extends Component {

    state = {
        color: 'transparent'
        
    }

    compontentDidMount() {
        this.setState({
            color: this.props.color
        })
    }

    changeBackground = () => {
        if(this.props.color !== this.state.color) {
            this.setState({ color: this.props.color })
        } else {
            this.setState({ color: 'transparent' })
        }
    }

    render() {
        return (
            <div 
                className="habitDayIncomplete"
                onClick={this.changeBackground}
                style={{backgroundColor: this.state.color}}>
                    {this.props.id}
                </div>
        )
    }

}
