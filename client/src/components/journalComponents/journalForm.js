import React, { Component } from 'react';

export default class JournalForm extends Component {

    componentDidMount() {
        this.props.setInputMode()
    }

    render() {
        return "This is the list form."
    }

}