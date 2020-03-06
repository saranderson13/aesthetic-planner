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
        selectedDay: null
    }

    componentDidMount() {
        this.props.fetchJournals()
        this.setState({
            selectedDay: this.props.match.params.id
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                selectedDay: this.props.match.params.id
            })
        }
    }

    formatDate = dateObj => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        
        return !!dateObj ? `${weekDays[dateObj.getUTCDay()]}, ${months[dateObj.getUTCMonth()]} ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()}` : null
    }

    selectJournal = () => {
        if (this.props.loadingJournals || this.props.days.length <= 0) {
            return (
                <JournalBodyContainer 
                    status="loading" 
                    journalId={null} 
                    dayId={null} 
                    content={null} />
            )
        } else {
            if(this.props.days.length > 0) {
                const journal = this.props.journals.find( j => j.day_id.toString() === this.state.selectedDay )
                const day = this.props.days.find( d => d.id.toString() === this.state.selectedDay)
                const dateObj = !!day ? new Date(day.date) : null
                const formattedDate = this.formatDate(dateObj)
                if (!!journal) {
                    return (
                        <JournalBodyContainer 
                            entry={true} 
                            journalId={journal.id} 
                            // dayId={journal.day_id}
                            // todayId={this.props.currentDayId}
                            futureDate={!!(parseInt(journal.dayId, 10) > this.props.currentDayId)}
                            pastDate={!!(parseInt(journal.dayId, 10) < this.props.currentDayId)}
                            formattedDate = {formattedDate}
                            content={journal.content} />
                    )
                } else {
                    return (
                        <JournalBodyContainer 
                            entry={false} 
                            journalId={null} 
                            // dayId={this.state.selectedDay} 
                            // todayId={this.props.currentDayId}
                            futureDate={!!(parseInt(this.state.selectedDay, 10) > this.props.currentDayId)}
                            pastDate={!!(parseInt(this.state.selectedDay, 10) < this.props.currentDayId)}
                            formattedDate = {formattedDate}
                            content={null} />
                    )
                }
            }
        }
    }

    render() {
        return (
            <>
                <aside id="controlsContainer">
                    <JournalControlsContainer />
                    <nav id="navContainer">
                        <NavContainer 
                            journals={this.props.journals} 
                            dayId={this.props.match.params.id} />
                    </nav>
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
        currentDayId: state.controls.currentDayId
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchJournals: () => dispatch(fetchJournals())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalContainer)