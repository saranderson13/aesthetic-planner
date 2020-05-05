import React, { Component } from 'react'
import HabitTable from '../../components/trackersComponents/habitTable'
import SleepTable from '../../components/trackersComponents/sleepTable'
import MoodTable from '../../components/trackersComponents/moodTable'
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

    habitTableGenerator = (kind) => {
        if(!!this.props.trackerData && this.props.trackerData.length > 0) {
            const tracker = this.props.trackerData.find( t => t.kind === kind )
            switch (kind) {
                case "habit":
                    return (
                        <HabitTable 
                            lines={tracker.tracker_lines} 
                            paintColor={this.props.paintColor} 
                            kind={kind} 
                            trackerId={tracker.id} />
                    )

                case "sleep":
                    return (
                        <SleepTable 
                            lines={tracker.tracker_lines} 
                            paintColor={this.props.paintColor} 
                            kind={kind} />
                    )

                case "mood":
                    return (
                        <MoodTable 
                            lines={tracker.tracker_lines} 
                            paintColor={this.props.paintColor} 
                            kind={kind} />
                    )
            }
        }
    }

    render() {
        return (
            <>
                <h1>{this.props.pageName}</h1>
                {this.habitTableGenerator("habit")}
                {this.habitTableGenerator("sleep")}
                {this.habitTableGenerator("mood")}
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
