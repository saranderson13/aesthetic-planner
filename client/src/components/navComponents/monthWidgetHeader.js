// STATELESS COMPONENT #2

import React, { Component } from 'react';

export default class MonthWidgetHeader extends Component {

    displayBack() {
        if(this.props.month.number !== 1) {
            return (<span className="back" onClick={this.props.back}>back</span>)
        } else { return <span className="back disabled">-</span> }
    }

    displayNext() {
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