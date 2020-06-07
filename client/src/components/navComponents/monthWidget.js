import React, { Component } from 'react'
import { connect } from 'react-redux'
import MonthWidgetHeader from './monthWidgetHeader'
import MonthWidgetCalendar from './monthWidgetCalendar'
import LoadingWheel from '../../assets/images/loading-wheel.gif'

class MonthWidget extends Component {
    
    state = {
        displayMonth: null,
        page: window.location.href.split("/").reverse()[1],
    }

    componentDidMount() {
        // If display month has not been set (so basically on first load), and if the current month
        // has been retrieved from store, set the local state.
        if (this.state.displayMonth === null && Object.keys(this.props.currentMonth).length !== 0) {
            if(this.props.pageName === "trackers") {
                const viewingMonth = this.props.months.find( m => m.id === parseInt(this.props.monthId, 10) )
                this.setState({ displayMonth: viewingMonth })
            } else {
                this.setState({ displayMonth: this.props.currentMonth })
            }
        }
    }

    navToPrevMonth() {
        this.setState({ displayMonth: this.props.months.find( m => m.number === this.state.displayMonth.number - 1 ) })
    }

    navToNextMonth = () => {
        this.setState({ displayMonth: this.props.months.find( m => m.number === this.state.displayMonth.number + 1 ) })
    }

    displayWidget() {
        // If months have populated, AND days have populated, show the calendar
        // else show loading wheel.
        if (this.props.months.length > 0 && this.props.days.length > 0) {
            return (
                <>
                    <MonthWidgetHeader 
                        month={this.state.displayMonth === null ? this.props.currentMonth : this.state.displayMonth} 
                        page={this.state.page}
                        back={this.navToPrevMonth.bind(this)} 
                        next={this.navToNextMonth.bind(this)} />
                    <MonthWidgetCalendar 
                        month={this.state.displayMonth === null ? this.props.currentMonth : this.state.displayMonth} 
                        page={this.state.page} 
                        currentDayId={this.props.currentDayId}
                        entries={this.props.journalEntries} />
                </>
            )
        } else {
            return (
                <>
                    <div className="monthWidgetHeader">Loading...</div>
                    <img src={LoadingWheel} alt="Loading" />
                </>
            )
        }
    }

    render() {
        return (
            <div className="monthWidget">
                {this.displayWidget()}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        months: state.controls.months,
        currentMonth: state.controls.currentMonth,
        days: state.controls.days,
        currentDayId: state.controls.currentDayId,
        journal: state.journals.journal,
        journalEntries: state.journals.entries
    };
}

export default connect(mapStateToProps, null)(MonthWidget)