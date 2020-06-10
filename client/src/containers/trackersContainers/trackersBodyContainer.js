import React, { Component } from 'react'
import HabitTable from '../../components/trackersComponents/habitTable'
import SleepTable from '../../components/trackersComponents/sleepTable'
import MoodTable from '../../components/trackersComponents/moodTable'
import DatesLine from '../../components/trackersComponents/datesLine'
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

    generateDatesLine = () => {
        // console.log(this.props)
        if(this.props.months.length > 0) {
            const month = this.props.months.find( m => m.id === parseInt(this.props.monthId, 10) )
            return <DatesLine days={month.days} />
        } else {
            return <DatesLine days="Loading" />
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
                            monthId = {this.props.monthId}
                            trackerId={tracker.id} 
                            generateDatesLine = {this.generateDatesLine} />
                    )

                case "sleep":
                    return (
                        <SleepTable 
                            lines={tracker.tracker_lines} 
                            paintColor={this.props.paintColor} 
                            kind={kind} 
                            generateDatesLine = {this.generateDatesLine} />
                    )

                case "mood":
                    return (
                        <MoodTable 
                            lines={tracker.tracker_lines} 
                            paintColor={this.props.paintColor} 
                            kind={kind} 
                            generateDatesLine = {this.generateDatesLine} />
                    )
            }
        }
    }

    render() {
        return (
            <>
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
        trackerData: state.trackers.trackers,
        months: state.controls.months
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackersBodyContainer)
