// STATELESS COMPONENT

import React, { Component } from 'react';

export default class MonthWidgetHeader extends Component {

    displayBack() {
        // Do not show back button in January (nowhere to go back to)
        if(this.props.month.number !== 1) {
            return (<span className="back" onClick={this.props.back}>back</span>)
        } else { return <span className="back disabled">-</span> }
    }

    displayNext() {
        // Do not show next button in December (nowhere to go next to)
        if(this.props.month.number !== 12) {
            return (<span className="next" onClick={this.props.next}>next</span>)
        } else { return <span className="next disabled">-</span> }
    }

    render() {
        return (
            <div className="monthWidgetHeader">
                {this.displayBack()}
                <span className="current">{this.props.month.name}</span>
                {this.displayNext()}
            </div>
        )
    }

}