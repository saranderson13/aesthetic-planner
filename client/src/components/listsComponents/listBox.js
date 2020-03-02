// STATELESS COMPONENT

import React, { Component } from 'react'

export default class ListBox extends Component {
    
    componentDidMount() {
        const allItems = document.getElementsByClassName("listBox");
        // if statement to ensure for loop only runs once
        if ( allItems[0].style.gridRowEnd === "" ) {
            debugger;
            for ( let x = 0; x < allItems.length; x++ ) {
                // contentHeight = padding + titleHeight + listHeight
                const contentHeight = 40 + allItems[x].children[0].offsetHeight + allItems[x].children[1].offsetHeight
                const rowSpan = Math.ceil( contentHeight / 20 )
                allItems[x].style.gridRowEnd = "span " + rowSpan;
            }
        }
    }

    render() {
        return (
            <div key={this.props.list.id} className="listBox" >
                <h3>{this.props.list.name}</h3>
                <ul>
                    { this.props.list.list_items.map( i => <li key={i.id} >{i.name}</li>) }
                </ul>
            </div>
        )
    }

}