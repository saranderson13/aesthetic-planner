import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMonthsForWidget } from '../../actions/controlsActions'
import MonthWidgetHeader from './monthWidgetHeader'
import MonthWidgetCalendar from './monthWidgetCalendar'
import LoadingWheel from '../../assets/images/loading-wheel.gif'

class MonthWidget extends Component {
    
    state = {
        displayMonth: null,
        page: window.location.href.split("/").reverse()[1],
    }

    componentDidMount() {
        this.props.fetchMonthsForWidget()   

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.displayMonth === null && Object.keys(this.props.currentMonth).length !== 0) {
            this.setState({
                displayMonth: this.props.currentMonth
            })
        }
    }

    navToPrevMonth() {
        this.setState({ displayMonth: this.props.months.find( m => m.number === this.state.displayMonth.number - 1 ) })
    }

    navToNextMonth = () => {
        this.setState({ displayMonth: this.props.months.find( m => m.number === this.state.displayMonth.number + 1 ) })
    }

    displayWidget() {
        if (!this.props.loading && this.props.months.length > 0) {
            return (
                <>
                    <MonthWidgetHeader 
                        month={this.state.displayMonth === null ? this.props.currentMonth : this.state.displayMonth} 
                        back={this.navToPrevMonth.bind(this)} 
                        next={this.navToNextMonth.bind(this)} />
                    <MonthWidgetCalendar 
                        month={this.state.displayMonth === null ? this.props.currentMonth : this.state.displayMonth} 
                        page={this.state.page} 
                        currentDayId={this.props.currentDayId}
                        journals={this.props.journals} />
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
        loading: state.controls.loading,
        days: state.controls.days,
        currentDayId: state.controls.currentDayId,
        journals: state.journals.journals
    };
}

export default connect(mapStateToProps, { fetchMonthsForWidget })(MonthWidget)