import React, { Component } from 'react'
import ListBox from '../../components/listsComponents/listBox'
import LoadingWheel from '../../assets/images/loading-wheel.gif'

class ListsBodyContainer extends Component {

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