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

    // componentDidUpdate() {
    //     debugger;
    //     if(this.state.dayColor !== this.props.nativeColor) {
    //         this.setState({ dayColor: this.props.nativeColor })
    //     }
    // }

    // changeBackground = () => {
    //     if(this.props.paintColor !== this.state.paintColor) {
    //         this.setState({ paintColor: this.props.paintColor })
    //     } else {
    //         this.setState({ paintColor: 'transparent' })
    //     }
    // }

    updateStatus = e => {
        e.preventDefault()
        const dayPacket = {
            id: this.props.id
        }
        if (this.props.paintColor !== this.props.nativeColor) {
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
                className="habitDayIncomplete"
                onClick={this.updateStatus}
                style={{backgroundColor: this.state.dayColor}}>
                    {this.props.id}
                </div>
        )
    }

}

// const mapStateToProps = state => {
//     debugger;
//     return ({
//         dayStatus: "incomplete",
//         statusColor: "#ff0099"
//     })
// }

const mapDispatchToProps = dispatch => {
    return ({
        updateStatus: dayPacket => dispatch(updateStatus(dayPacket))
    })
}

export default connect(null, mapDispatchToProps)(HabitDay)

// export default HabitDay