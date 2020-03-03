import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchJournals } from '../../actions/journalActions'
import NavContainer from '../navContainer'
import JournalControlsContainer from './journalControlsContainer'
import JournalBodyContainer from './journalBodyContainer'

class JournalContainer extends Component {

    // DIRECTIVES
    // Controls container has options for a view mode or input mode.
    // Below that is navigation to view specific entries
    // links in calendar widget for future days are disabled

    // In the body, by default you view the journal entry for the current day, 
    // if entry for current day doesn't exist, immediately show input mode
    // In input mode, you see a text area (maybe with a preview on the side?)
    // By selecting other entries in the controls container, you view them in the body.

    state = {
        toggleView: true,
        toggleInput: false,
        currentDayId: null
    }

    componentDidMount() {
        this.props.fetchJournals()
        this.setState({
            currentDayId: this.props.match.params.id
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                currentDayId: this.props.match.params.id
            })
        }
    }

    selectJournal = () => {
        if (this.props.loadingJournals) {
            return <JournalBodyContainer status="loading" journalId={null} dayId={null} content={null} />
        } else {
            if(this.props.days.length > 0) {
                const journal = this.props.journals.find( j => j.day_id.toString() === this.state.currentDayId )
                if (!!journal) {
                    return <JournalBodyContainer status="valid" journalId={journal.id} dayId={journal.day_id} content={journal.content} />
                } else {
                    return <JournalBodyContainer status="no entry" journalId={null} dayId={this.state.currentDayId} content={null} />
                }
            } else {
                return <JournalBodyContainer status="loading" journalId={null} dayId={null} content={null} />
            }
        }
    }

    render() {
        console.log("In render")
        return (
            <>
                <aside id="controlsContainer">
                    <JournalControlsContainer />
                    <nav id="navContainer"><NavContainer journals={this.props.journals} /></nav>
                </aside>
                <section id="bodyContainer">{this.selectJournal()}</section>
            </>
        )
    }

}

const mapStateToProps = state => {
    return ({
        days: state.controls.days,
        journals: state.journals.journals,
        loadingJournals: state.journals.loadingJournals,
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchJournals: () => dispatch(fetchJournals())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalContainer)