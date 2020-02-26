import React, { Component } from 'react'
import MonthWidget from '../components/navComponents/monthWidget'
import PageLinks from '../components/navComponents/pageLinks'

export default class NavContainer extends Component {

    render() {
        return (
            <div>
                <PageLinks />
                <MonthWidget />
            </div>
        )
    }

}