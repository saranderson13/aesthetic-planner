import React, { Component } from 'react'
import ListBox from '../../components/listsComponents/listBox'
import LoadingWheel from '../../assets/images/loading-wheel.gif'

class ListsBodyContainer extends Component {

    componentDidMount() {
        const body = document.getElementById('bodyContainer')
        body.addEventListener("resize", this.resizeAllGridItems);
    }

    resizeGridItem = item => {
        const rowSpan = Math.ceil(160/50)
        item.style.gridRowEnd = "span " + rowSpan;
    }
    
    resizeAllGridItems = () => {
        const allItems = document.getElementsByClassName("listBox");
        for( let x = 0; x < allItems.length; x++ ) {
            this.resizeGridItem(allItems[x]);
        }
    }

    generateListBoxes = () => {
        return this.props.lists.map ( l => { return <ListBox list={l} /> } )
    }

    render() {
        if (this.props.loading) {
            return (
                <img src={LoadingWheel} alt="Loading" />
            )
        } else {
            return (
                <div className="grid">
                    { this.generateListBoxes() }
                </div>
            )
        }
    }

}

export default ListsBodyContainer