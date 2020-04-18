import React, { Component } from 'react'
import HabitTable from '../../components/trackersComponents/habitTable'
import { connect } from 'react-redux'
import { fetchTrackers } from '../../actions/trackerActions'

class TrackersBodyContainer extends Component {

    componentDidMount() {
        this.props.fetchTrackers({monthId: this.props.monthId})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.monthId !== this.props.monthId) {
            this.props.fetchTrackers({monthId: this.props.monthId})
        }
    }

    render() {
        console.log(this.props.trackerData)
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
    return({
        numDays: state.controls.currentMonth.numDays,
        trackersForMonth: state.controls.currentMonth.trackers,
        trackerData: state.trackers.trackers
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackersBodyContainer)
