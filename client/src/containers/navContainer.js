import React, { Component } from 'react'
import { connect } from 'react-redux'
import MonthWidget from '../components/navComponents/monthWidget'
import PageLinks from '../components/navComponents/pageLinks'

class NavContainer extends Component {
    
    render() {
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

export default connect(mapStateToProps)(NavContainer)

