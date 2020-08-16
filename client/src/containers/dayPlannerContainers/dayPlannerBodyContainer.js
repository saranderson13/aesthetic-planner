import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../helperFunctions'
import LoadingPage from '../../containers/loadingPageContainer'


class DayPlannerBodyContainer extends Component {

    state = {
        selectedDay: null
    }

    componentDidMount() {
        this.setState({
            selectedDay: this.props.dayId
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dayId !== this.props.dayId) {
            this.setState({
                selectedDay: this.props.dayId
            })
        }
    }

    render() {
        if (this.props.days.length > 0) {
            const day = this.props.days.find( d => d.id.toString() === this.state.selectedDay)
            const dateObj = !!day ? new Date(day.date) : null
            return (
                <div className="journalDate">{this.props.formatDate(dateObj)}</div>
            )
        } else {
            return (
                <LoadingPage />
            )
        }
    }

}

const mapStateToProps = state => {
    return ({
        days: state.controls.days
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        formatDate: dateObj => formatDate(dateObj)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPlannerBodyContainer)