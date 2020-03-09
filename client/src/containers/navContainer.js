import React, { Component } from 'react'
import { connect } from 'react-redux'
import MonthWidget from '../components/navComponents/monthWidget'
import PageLinks from '../components/navComponents/pageLinks'

class NavContainer extends Component {
    
    render() {
        return (
            <div>
                <PageLinks currentDayId={this.props.currentDayId} />
                <MonthWidget dayId={this.props.dayId} />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return ({
        currentDayId: state.controls.currentDayId
    })
}

export default connect(mapStateToProps)(NavContainer)

