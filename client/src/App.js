import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchDays } from './actions/controlsActions'
import './assets/trackers.css'
import './assets/lists.css'
import './assets/journal.css'
import './assets/controls.css'
import './assets/App.css'

// ONLY NEEDED TO RUN FETCH TEST
// import { fetchTest } from './actions/_testAction'


// PlannerContainer IS FOR FUTURE IMPLEMENTATION OF WEEKLY AND MONTHLY CALENDAR PAGES
// import PlannerContainer from './containers/plannerContainer'
import TrackerContainer from './containers/trackersContainers/trackerContainer'
import ListsContainer from './containers/listsContainers/listsContainer'
import JournalContainer from './containers/journalContainers/journalContainer'
import DayPlannerContainer from './containers/dayPlannerContainers/dayPlannerContainer'

class App extends Component {

  componentDidMount() {
    this.props.fetchDays()
  }

  getCurrentPlannerLink = () => {
    if (!!this.props.currentDayId) {
        return <Redirect to={`/day-planner/${this.props.currentDayId}`} />
    } else {
        return "Loading..."
    }
  }
  
  render() {
    return (
      <Router>      
        <Switch>
          <Route 
            path="/day-planner/:id" 
            component={ ({match}) => (<DayPlannerContainer match={match} />)} />

          <Route path="/trackers">
            <TrackerContainer />
          </Route>

          <Route path="/lists">
            <ListsContainer />
          </Route>

          <Route 
            path="/journal/:id" 
            component={ ({match}) => (<JournalContainer match={match} />)} />
          
          <Route path="/">
            { this.getCurrentPlannerLink() }
          </Route>
        </Switch>
      </Router>
    )
  }
  
}

const mapStateToProps = state => {
  return({
    days: state.controls.days,
    loadingDays: state.controls.loadingDays,
    currentDayId: state.controls.currentDayId
  })
}

const mapDispatchToProps = dispatch => {
  return ({
      fetchDays: () => dispatch(fetchDays())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// EXAMPLE: #componentDidMount()
// componentDidMount() {
    // STATIC TEST
    // let months = ["January", "February", "March"]
    // this.props.fetchTest(months)

    // DYNAMIC TEST
    // debugger;
    // this.props.fetchTest()
  // }


// const handleSubmit = async (monthId) => {
//   try {
//     const resp = await fetch(`/months/${monthId}`)
//     if(!resp.ok) { throw resp }

//     const data = await resp.json
//     console.log(data)
//   } catch {

//   }
// }



// EXAMPLE: Mapping to display elements
// {this.props.months.map( m => { return <li>{m.name}</li>})}


// NOT NEEDED IN APP COMPONENT
// componentDidMount() {
  // fetch initial data
// }

// const mapStateToProps = state => {
  //   return {
    //     months: state.months,
    //     loading: state.loading
    //   }
    // }
    
    // const mapDispatchToProps = dispatch => {
    //     return {
    //         fetchTest: (months) => dispatch(fetchTest(months))
    //     }
    // }

// export default connect(mapStateToProps, mapDispatchToProps)(App);





