import React, { Component } from 'react'
import ListItemLine from './listItemLine'

export default class ListBox extends Component {

    render() {
        return (
            <div key={this.props.list.id} className="listBox" >
                <div className="listTitle" >
                    {this.props.list.name}
                </div>
                <ul className={ this.props.list.checklist ? 'checklistItems' : 'listItems' }>
                    { this.props.list.list_items.map( i => <ListItemLine checklist={this.props.list.checklist} item={i} />) }
                </ul>
            </div>
        )
    }

}