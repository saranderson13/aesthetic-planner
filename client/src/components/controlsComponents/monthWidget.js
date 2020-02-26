import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMonthsForWidget } from '../../actions/controlsActions'
import MonthWidgetHeader from './monthWidgetHeader'
import MonthWidgetCalendar from './monthWidgetCalendar'
import LoadingWheel from '../../assets/images/loading-wheel.gif'

class MonthWidget extends Component {
    
    state = {
        displayMonth: null
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
        this.setState({ displayMonth: this.props.months.find( m => m.number == this.state.displayMonth.number - 1 ) })
    }

    navToNextMonth = () => {
        this.setState({ displayMonth: this.props.months.find( m => m.number == this.state.displayMonth.number + 1 ) })
    }

    displayWidget() {
        if (!this.props.loading && this.props.months.length > 0) {
            if (this.state.displayMonth === null) { 
                return (
                    <>
                        <MonthWidgetHeader month={this.props.currentMonth} back={this.navToPrevMonth.bind(this)} next={this.navToNextMonth.bind(this)} />
                        <MonthWidgetCalendar month={this.props.currentMonth} />
                    </>
                )
            } else {
                return (
                    <>
                        <MonthWidgetHeader month={this.state.displayMonth} back={this.navToPrevMonth.bind(this)} next={this.navToNextMonth.bind(this)} />
                        <MonthWidgetCalendar month={this.state.displayMonth} />
                    </>
                )
            }
        } else {
            return (
                <>
                    <div className="monthWidgetHeader">Loading...</div>
                    <img src={LoadingWheel} />
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
        loading: state.controls.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMonthsForWidget: (months) => dispatch(fetchMonthsForWidget(months))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthWidget)