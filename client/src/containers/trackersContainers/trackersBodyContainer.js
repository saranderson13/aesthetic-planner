import React, { Component } from 'react'
import HabitTable from '../../components/trackersComponents/habitTable'
import { connect } from 'react-redux'
import { fetchTrackers } from '../../actions/trackerActions'

class TrackersBodyContainer extends Component {

    state = {
        habit: {},
        mood: {},
        sleep: {}
    }

    componentDidMount() {
        this.props.fetchTrackers({ id: 10 })
    }

    componentDidUpdate() {
        // debugger;
        // if(this.props.trackerData.length === 0) {
        //     // debugger;
        //     const tracker = this.props.trackersForMonth.find( t => t.kind === "habit" )
        //     const trackerPacket = {
        //         id: tracker.id
        //     }
        //     debugger;
        //     this.props.fetchTrackers(trackerPacket)
        // }
        // debugger;
    }

    render() {
        return (
            <>
                <h1>{this.props.pageName}</h1>
                <HabitTable color={this.props.color} />
            </>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return({
        fetchTrackers: (trackerPacket) => dispatch(fetchTrackers(trackerPacket))
    })
}

const mapStateToProps = state => {
    console.log(state.trackers)
    return({
        numDays: state.controls.currentMonth.numDays,
        trackersForMonth: state.controls.currentMonth.trackers,
        trackerData: state.trackers.trackers
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackersBodyContainer)
