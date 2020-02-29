import React, { Component } from 'react';

export default class ListForm extends Component {

    state = {
        title: "",
        listItems: ""
    }

    removeBadCharacters = arr => {
        return arr.map ( i => i.replace(/^\s+|\s+$/g, '') ).filter( i => i !== "" )
    }

    handleSubmit = e => {
        e.preventDefault();
        const listPacket = {
            title: this.state.title,
            listItems: this.removeBadCharacters(this.state.listItems.split(";"))
        }
        this.props.listFunction(listPacket)
        this.setState = {
            title: "",
            listItems: "",
            currentListId: null
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    displayEditDropdown = () => {
        if (!!this.props.lists) {
            return (
                <select 
                    id="currentLists" 
                    onChange={ e => this.populateEditFields(e).bind(this) } 
                    value={this.state.currentListId} 
                    required>
                    <option></option>
                    {this.generateListOptions()}
                </select>
            )
        }
    }

    generateListOptions = () => {
        return this.props.lists.map ( l => { return <option value={l.id}>{l.name}</option> } )
    }

    populateEditFields = e => {
        debugger;
        const selectedList = Array.from(e.target.children).find( o => o.selected )
        debugger;
        // this.setState({
        //     title
        // })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <div className="listFormBackButtonContainer" ><button onClick={this.props.back}>X</button></div>
                <form id="listForm" onSubmit={e => this.handleSubmit(e)}>
                    {this.displayEditDropdown()}
                    <label for="title" className="listFormLabel">List Title</label>
                    <input 
                        id="title" 
                        type="text" 
                        className="listFormTitleInput" 
                        onChange={ e => this.handleChange(e)} 
                        value={this.state.title}/>
                    <div className="listFormSubText">**Separate list items with a semicolon (;).</div>
                    <textarea 
                        id="listItems" 
                        className="listFormTextArea" 
                        onChange={ e => this.handleChange(e)} 
                        value={this.state.listItems} />
                    <input 
                        type="submit" 
                        value="Create List" />
                </form>
                
            </>
        )
    }

}