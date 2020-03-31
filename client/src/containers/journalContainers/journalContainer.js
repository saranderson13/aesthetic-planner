import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchJournals, submitJournal } from '../../actions/journalActions'
import NavContainer from '../navContainer'
import JournalControlsContainer from './journalControlsContainer'
import JournalBodyContainer from './journalBodyContainer'

class JournalContainer extends Component {

    // DIRECTIVES
    // Controls container has options for a view mode or input mode for editable entries.
    // Below that is navigation to view specific entries
    // links in calendar widget for future days are disabled

    // In the body, by default you view the journal entry for the current day, 
    // if entry for current day doesn't exist, immediately show input mode
    // In input mode, you see a text area (maybe with a preview on the side?)
    // By selecting other entries in the controls container, you view them in the body.

    state = {
        toggleView: true,
        toggleInput: false,
        selectedDay: null,
        inputLegal: false
    }

    componentDidMount() {
        this.props.fetchJournals()
        this.setState({
            selectedDay: this.props.match.params.id
        })
    }

    componentDidUpdate(prevProps) {
        // If all props are loaded
        if (this.props.days.length > 0 && !this.loadingJournals && this.props.journals.length > 0 ) {
            const journal = this.props.journals.find( j => j.day_id.toString() === this.state.selectedDay )
            if ( this.state.selectedDay === this.props.currentDayId && !journal ) {
            // If viewing the current day but there is no journal entry - toggle to input mode
                if ( this.state.toggleView ) { 
                    this.setState({
                        toggleView: false,
                        toggleInput: true,
                        inputLegal: false
                    })
                }
            } else if (this.state.selectedDay === this.props.currentDayId && !!journal ) {
            // If viewing the current day and there IS a journal entry, toggle to view mode
                if ( this.state.toggleInput ) {
                    this.setState({
                        toggleView: true,
                        toggleInput: false,
                        inputLegal: true
                    })
                }
            }

            // If viewing a day prior to the current day that has a journal entry, allow the edit post button.
            if (this.state.selectedDay <= this.props.currentDayId && !!journal && !this.state.inputLegal) {
                this.setState({
                    inputLegal: true
                })
            }
        }

        // If the page has been changed, set the selected day in state then force view
        // This prevents edit mode from being carried from one day to the other.
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                selectedDay: this.props.match.params.id
            }, this.forceView())
        }
    }

    formatDate = dateObj => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        
        return !!dateObj ? `${weekDays[dateObj.getUTCDay()]}, ${months[dateObj.getUTCMonth()]} ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()}` : null
    }

    toggleView = e => {
        this.setState( prevState => {
            return {
                toggleView: !prevState.toggleView,
                toggleInput: !prevState.toggleInput
            }
        })
    }

    forceView = () => {
        if(this.state.toggleInput) {
            this.setState({
                toggleView: true,
                toggleInput: false
            })
        }
    }

    enableToggle = () => {
        if(!this.state.inputLegal) {
            this.setState({
                inputLegal: true
            })
        }
    }

    recentEntries = () => {
        if (this.props.journals.length > 0 && this.props.journals.length > 5) {
            return this.props.journals.slice(this.props.journals.length - 5).sort( (a, b) => b.day_id - a.day_id )
        } else {
            return this.props.journals.sort( (a, b) => b.day_id - a.day_id )
        }
    }

    selectJournal = () => {
        let mode = this.state.toggleView ? "view" : "edit"
        if (this.props.loadingJournals || this.props.days.length <= 0) {
            return (
                <JournalBodyContainer 
                    status="loading" />
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
                            mode={mode}
                            journalId={journal.id}
                            dayId={this.state.selectedDay}
                            formattedDate = {formattedDate}
                            content={journal.content} 
                            futureDate={!!(parseInt(journal.dayId, 10) > this.props.currentDayId)}
                            pastDate={!!(parseInt(journal.dayId, 10) < this.props.currentDayId)} 
                            forceView={this.forceView}
                            enableToggle={this.enableToggle}
                            submitJournal={this.props.submitJournal} />
                    )
                } else {
                    return (
                        <JournalBodyContainer 
                            entry={false}
                            mode={mode}
                            dayId={this.state.selectedDay}
                            formattedDate = {formattedDate}
                            futureDate={!!(parseInt(this.state.selectedDay, 10) > this.props.currentDayId)}
                            pastDate={!!(parseInt(this.state.selectedDay, 10) < this.props.currentDayId)} 
                            forceView={this.forceView}
                            enableToggle={this.enableToggle}
                            submitJournal={this.props.submitJournal} />
                    )
                }
            }
        }
    }

    render() {
        const recentEntries = this.recentEntries()
        const mode = this.state.toggleView ? "view" : "edit"
        return (
            <>
                <aside id="controlsContainer">
                    <nav id="navContainer">
                        <NavContainer 
                            journals={this.props.journals} 
                            dayId={this.props.match.params.id} />
                    </nav>
                    <JournalControlsContainer 
                        days={this.props.days}
                        inputLegal={this.state.inputLegal}
                        mode={mode}
                        recentEntries={recentEntries} 
                        formatDate={this.formatDate.bind(this)} 
                        toggleView={this.toggleView.bind(this)} />
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
        fetchJournals: () => dispatch(fetchJournals()),
        submitJournal: (journalPacket, method) => dispatch(submitJournal(journalPacket, method))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalContainer)