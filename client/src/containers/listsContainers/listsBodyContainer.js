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
    }

    generateListBoxes = () => {
        const sortedLists = this.props.lists.sort( (l1, l2) => new Date(l2.updated_at) - new Date(l1.updated_at) )
        return (
            <div id="listsWrapper">
                { sortedLists.map ( l => { return <ListBox list={l} /> } ) }
            </div>
        )
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