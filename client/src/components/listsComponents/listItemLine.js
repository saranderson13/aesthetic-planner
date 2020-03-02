import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkboxForListItem } from '../../actions/listsActions'


class ListLineItem extends Component {

    handleCheckbox = e => {
        const itemPacket = {
            list_item: {
                id: this.props.item.id,
                completed: e.target.checked
            }
        }
        this.props.checkBox(itemPacket)
    }

    renderCheckbox = () => {
        if (this.props.item.completed) {
            return (
                <input 
                    type="checkbox"
                    className="listCheckbox"
                    onChange={ e => this.handleCheckbox(e) } 
                    checked="checked"/>
            )
        } else {
            return (
                <input 
                    type="checkbox" 
                    className="listCheckbox" 
                    onChange={ e => this.handleCheckbox(e) } />
            )
        }
    }

    renderBullet = () => {
        if ( this.props.checklist === true ){
            return (
                <li className="checklistBullet" key={this.props.item.id} >
                    {this.renderCheckbox()}
                    {this.props.item.name}                        
                </li>
            )
        } else {
            return (
                <li key={this.props.item.id} >
                    {this.props.item.name}
                </li>
            )
        }
    }

    render() {
        return this.renderBullet()
    }

}

const mapDispatchToProps = dispatch => {
    return {
        checkBox: itemPacket => dispatch(checkboxForListItem(itemPacket))
    }
}

export default connect(null, mapDispatchToProps)(ListLineItem)