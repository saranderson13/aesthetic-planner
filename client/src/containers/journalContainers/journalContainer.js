import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchJournal, submitEntry } from '../../actions/journalActions'
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
        this.props.fetchJournal()
        this.setState({
            selectedDay: this.props.match.params.id
        })
    }

    componentDidUpdate(prevProps) {
        // If all props are loaded
        if (this.props.days.length > 0 && !this.loadingJournal && this.props.entries.length > 0 ) {
            const entries = this.props.entries.find( j => j.day_id.toString() === this.state.selectedDay )
            if ( this.state.selectedDay === this.props.currentDayId && !entries ) {
            // If viewing the current day but there is no journal entry - toggle to input mode
                if ( this.state.toggleView ) { 
                    this.setState({
                        toggleView: false,
                        toggleInput: true,
                        inputLegal: false
                    })
                }
            } else if (this.state.selectedDay === this.props.currentDayId && !!entries ) {
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
            if (this.state.selectedDay <= this.props.currentDayId && !!entries && !this.state.inputLegal) {
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

    disableToggle = () => {
        if(this.state.inputLegal) {
            this.setState({
                inputLegal: false
            })
        }
    }

    recentEntries = () => {
        if (this.props.entries.length > 0 && this.props.entries.length > 5) {
            return this.props.entries.slice(this.props.entries.length - 5).sort( (a, b) => b.day_id - a.day_id )
        } else {
            return this.props.entries.sort( (a, b) => b.day_id - a.day_id )
        }
    }

    selectEntry = () => {
        let mode = this.state.toggleView ? "view" : "edit"
        if (this.props.loadingJournal || this.props.days.length <= 0) {
            return (
                <JournalBodyContainer 
                    status="loading" />
            )
        } else {
            if(this.props.days.length > 0) {
                const entry = this.props.entries.find( j => j.day_id.toString() === this.state.selectedDay )
                const day = this.props.days.find( d => d.id.toString() === this.state.selectedDay)
                const dateObj = !!day ? new Date(day.date) : null
                const formattedDate = this.formatDate(dateObj)
                if (!!entry) {
                    return (
                        <JournalBodyContainer 
                            entryExists={true} 
                            mode={mode}
                            entryId={entry.id}
                            dayId={this.state.selectedDay}
                            formattedDate = {formattedDate}
                            content={entry.content} 
                            futureDate={!!(parseInt(entry.dayId, 10) > this.props.currentDayId)}
                            pastDate={!!(parseInt(entry.dayId, 10) < this.props.currentDayId)} 
                            forceView={this.forceView}
                            enableToggle={this.enableToggle}
                            submitEntry={this.props.submitEntry} />
                    )
                } else {
                    return (
                        <JournalBodyContainer 
                            entryExists={false}
                            mode={mode}
                            dayId={this.state.selectedDay}
                            formattedDate = {formattedDate}
                            futureDate={!!(parseInt(this.state.selectedDay, 10) > this.props.currentDayId)}
                            pastDate={!!(parseInt(this.state.selectedDay, 10) < this.props.currentDayId)} 
                            forceView={this.forceView}
                            enableToggle={this.enableToggle}
                            disableToggle={this.disableToggle}
                            submitEntry={this.props.submitEntry} />
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
                            pageName="non-tracker"
                            journal={this.props.journal} 
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
                <section id="bodyContainer">{this.selectEntry()}</section>
            </>
        )
    }

}

const mapStateToProps = state => {
    return ({
        days: state.controls.days,
        journal: state.journals.journal,
        entries: state.journals.entries,
        loadingJournal: state.journals.loadingJournal,
        currentDayId: state.controls.currentDayId
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchJournal: () => dispatch(fetchJournal()),
        submitEntry: (entryPacket, method) => dispatch(submitEntry(entryPacket, method))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalContainer)