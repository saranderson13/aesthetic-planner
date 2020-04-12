import React, { Component } from 'react'
import HabitTable from '../../components/trackersComponents/habitTable'
// import { connect } from 'react-redux'

class TrackersBodyContainer extends Component {



    render() {
        return (
            <>
                <h1>{this.props.pageName}</h1>
                <HabitTable color={this.props.color} />
            </>
        )
    }

}

export default TrackersBodyContainer