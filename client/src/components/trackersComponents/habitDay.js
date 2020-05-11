import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateHabitDayStatus as updateStatus } from '../../actions/trackerActions'

class HabitDay extends Component {

    state = {
        dayColor: 'transparent'
    }

    componentDidMount() {
        if(this.state.dayColor !== this.props.nativeColor) {
            this.setState({ dayColor: this.props.nativeColor })
        }
    }
    componentDidUpdate() {
        if(this.state.dayColor !== this.props.nativeColor) {
            this.setState({ dayColor: this.props.nativeColor })
        }
    }

    updateStatus = e => {
        e.preventDefault()
        const dayPacket = {
            id: this.props.id
        }
        if (this.props.paintColor !== this.props.nativeColor && this.props.paintColor !== 'transparent') {
            dayPacket['complete'] = true
            dayPacket['color'] = this.props.paintColor

            this.setState({ dayColor: this.props.paintColor })
        } else {
            dayPacket['complete'] = false
            dayPacket['color'] = 'transparent'

            this.setState({ dayColor: 'transparent' })
        }
        this.props.updateStatus(dayPacket)

    }

    render() {
        return (
            <div 
                className="habitDay"
                onClick={this.updateStatus}
                style={{backgroundColor: this.state.dayColor}}>
                    {this.props.complete.toString().slice(0,1).toUpperCase()}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return ({
        updateStatus: dayPacket => dispatch(updateStatus(dayPacket))
    })
}

export default connect(null, mapDispatchToProps)(HabitDay)

