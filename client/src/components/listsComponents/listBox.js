// STATELESS COMPONENT

import React, { Component } from 'react'
import ListItemLine from './listItemLine'

export default class ListBox extends Component {
    
    componentDidMount() {
        const allItems = document.getElementsByClassName("listBox");
        // if statement to ensure for loop only runs once
        if ( allItems[0].style.gridRowEnd === "" ) {
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
                <ul className={ this.props.list.checklist ? 'checklistItems' : 'listItems' }>
                    { this.props.list.list_items.map( i => <ListItemLine checklist={this.props.list.checklist} item={i} />) }
                </ul>
            </div>
        )
    }

}