import React, { Component } from 'react'
import ListBox from '../../components/listsComponents/listBox'
import LoadingWheel from '../../assets/images/loading-wheel.gif'

class ListsBodyContainer extends Component {

    componentDidMount() {
        const body = document.getElementById('bodyContainer')
        // body.addEventListener("resize", this.props.resizeBoxes);
    }

    // resizeListBox = box => {
    //     const contentHeight = 40 + box.children[0].offsetHeight + box.children[1].offsetHeight
    //     const rowSpan = Math.ceil( contentHeight / 20 )
    //     box.style.gridRowEnd = "span " + rowSpan;
    // }
    
    // resizeAllListBoxes = () => {
    //     const allBoxes = document.getElementsByClassName("listBox");
    //     for( let x = 0; x < allBoxes.length; x++ ) {
    //         this.resizeListBox(allBoxes[x]);
    //     }
    // }

    generateListBoxes = () => {
        const sortedLists = this.props.lists.sort( (l1, l2) => new Date(l2.updated_at) - new Date(l1.updated_at) )
        return sortedLists.map ( l => { return <ListBox list={l} /> } )
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