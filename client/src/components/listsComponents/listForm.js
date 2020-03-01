import React, { Component } from 'react';

export default class ListForm extends Component {

    state = {
        name: "",
        listItems: "",
        currentListId: null
    }

    removeBadCharacters = arr => {
        return arr.map ( i => i.replace(/^\s+|\s+$/g, '') ).filter( i => i !== "" )
    }

    handleSubmit = e => {
        e.preventDefault();
        const listPacket = {
            list: {
                name: this.state.name,
                list_items: this.removeBadCharacters(this.state.listItems.split(";"))
            }
        }
        if (!!this.state.currentListId) {
            listPacket["list"]["id"] = this.state.currentListId
        }
        // debugger;
        this.props.back()
        this.props.createOrUpdate(listPacket, !!this.state.currentListId ? 'PATCH' : 'POST')
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleDelete = e => {
        this.props.back()
        this.props.deleteList(this.state.currentListId)
    }

    generateListOptions = () => {
        if (!!this.props.lists) {
            return this.props.lists.map ( l => { return <option value={l.id}>{l.name}</option> } )
        }
    }

    populateEditFields = e => {
        const selectedList = Array.from(e.target.children).find( o => o.selected )
        if (selectedList.value === "blank"){
            this.setState({
                name: "",
                listItems: "",
                currentListId: null
            })
        } else {
            const listObject = this.props.lists.find( l => l.id.toString() ===selectedList.value )
            const listItems = listObject.list_items.map ( i => i.name ).join(" ; ");

            this.setState({
                name: listObject.name,
                listItems: listItems,
                currentListId: listObject.id
            })
        }                                
    }
     
    render() {
        return (
            <>
                <div className="listFormBackButtonContainer" ><button onClick={this.props.back}>X</button></div>
                <form id="listForm" onSubmit={e => this.handleSubmit(e)}>
                    <select
                        id={this.state.currentListId} 
                        className="selectListDropdown"
                        onChange={ e => this.populateEditFields(e) }
                        value={this.state.currentListId} 
                        style={{display: !!this.props.lists ? 'block' : 'none'}}
                        required>
                        <option value="blank">Select a list to edit...</option>
                        {this.generateListOptions()}
                    </select>
                    <label className="listFormLabel">
                        List Name
                        <input 
                            id="name" 
                            type="text" 
                            className="listFormNameInput" 
                            onChange={ e => this.handleChange(e)} 
                            value={this.state.name}/>
                        </label>
                    <div className="listFormSubText">**Separate list items with a semicolon (;).</div>
                    <textarea 
                        id="listItems" 
                        className="listFormTextArea" 
                        onChange={ e => this.handleChange(e)} 
                        value={this.state.listItems} />
                    <input 
                        type="submit" 
                        value={this.props.submitName} />
                </form>
                <button 
                    onClick={e => this.handleDelete(e)}
                    className="listDeleteButton"
                    style={{display: !!this.state.currentListId ? 'block' : 'none' }}>
                    DeleteList
                </button>
            </>
        )
    }

}