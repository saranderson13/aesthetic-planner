import React, { Component } from 'react'
import ListBox from '../../components/listsComponents/listBox'
import LoadingPage from '../../containers/loadingPageContainer'

class ListsBodyContainer extends Component {

componentDidMount() {
    window.addEventListener('resize', this.resizeAllListBoxes);
}

componentDidUpdate() {
    this.resizeAllListBoxes()
}

resizeListBox = box => {
    const contentHeight = 40 + box.children[0].offsetHeight + box.children[1].offsetHeight
    const rowSpan = Math.ceil( contentHeight / 10 )
    box.style.gridRowEnd = "span " + rowSpan;
}

resizeAllListBoxes = () => {
    const allBoxes = Array.from(document.getElementsByClassName("listBox"));
    for( let x = 0; x < allBoxes.length; x++ ) {
        this.resizeListBox(allBoxes[x]);
    }
    if (this.props.lists.length > 1) {
        this.bottomMarginFix()
    }}

bottomMarginFix = () => {
    // Adds margin to the bottom of the box that goes the lowest.

    const lists = document.getElementsByClassName('listBox')

    // Reset all bottom margins.
    function resetBottomMargin(node) {
        node.style.marginBottom = "0px"
    }
    
    if (lists.length > 0) {
        Array.from(lists).forEach( resetBottomMargin )
        
        // Sort by lowest screen position (screen position of the bottom of the box that goes the lowest).
        let bottomOrder = Array.from(lists).sort( (a, b) => {
            return (b.offsetTop + b.offsetHeight) - (a.offsetTop + a.offsetHeight)
        } )

        // Add bottom margin to the first box in the array ordered by bottom position.
        bottomOrder[0].style.marginBottom = "20px"   
    }
}

    generateListBoxes = () => {
        const sortedLists = this.props.lists.sort( (l1, l2) => new Date(l2.updated_at) - new Date(l1.updated_at) )
        return sortedLists.map ( l => { return <ListBox list={l} /> } )
    }

    render() {
        if (this.props.loading) {
            return (
                <LoadingPage />
            )
        } else if (this.props.lists.length === 0) {
            return (
                <div className="instruction">
                    {"❤ Create your first list"}
                </div>
            )
        } else {
            return (
                <>
                    { this.generateListBoxes() }
                </> 
            )
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeAllListBoxes)
    }

}

export default ListsBodyContainer