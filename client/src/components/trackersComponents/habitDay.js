import React, { Component } from 'react'

export default class HabitDay extends Component {

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
            <div className="habitDayIncomplete"></div>
        )
    }

}
