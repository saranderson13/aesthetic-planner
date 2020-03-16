import React, { Component } from 'react'
import ListItemLine from './listItemLine'

export default class ListBox extends Component {

    state = {
        likes: 0,
        color: 'blue'
    }
    
    componentDidMount() {

        const listBoxes = document.getElementsByClassName("listBox");
        // if statement to ensure for loop only runs once
        if ( listBoxes[0].style.gridRowEnd === "" ) {
            for ( let x = 0; x < listBoxes.length; x++ ) {
                // contentHeight = padding + titleHeight + listHeight
                const contentHeight = 40 + listBoxes[x].children[0].offsetHeight + listBoxes[x].children[1].offsetHeight
                const rowSpan = Math.ceil( contentHeight / 20 )
                listBoxes[x].style.gridRowEnd = "span " + rowSpan;
            }
        }
    }

    handleLike = () => { 

        this.setState(s  => {
            return ( {
                likes: s.likes + 1
            })
        })


        


    }

    render() {
        return (
            <div key={this.props.list.id} className="listBox" >
                <span>{this.state.likes} </span><button onClick={ this.handleLike }>Like</button>
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