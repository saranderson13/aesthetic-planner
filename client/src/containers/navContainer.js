import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDays } from '../actions/controlsActions'
import MonthWidget from '../components/navComponents/monthWidget'
import PageLinks from '../components/navComponents/pageLinks'

class NavContainer extends Component {

    componentDidMount() {
        this.props.fetchDays()
    }
    
    render() {
        // debugger;
        return (
            <div>
                <PageLinks days={this.props.days} />
                <MonthWidget />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return ({
        days: state.controls.days
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchDays: () => dispatch(fetchDays())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)