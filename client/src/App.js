import React, { Component } from 'react';
import './assets/App.css';

// ROUTER
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// ONLY NEEDED TO RUN FETCH TEST
// import { connect } from 'react-redux'
// import { fetchTest } from './actions/testAction'

import PlannerContainer from './containers/plannerContainer'
import TrackerContainer from './containers/trackerContainer'
import ListsContainer from './containers/listsContainer'
import JournalContainer from './containers/journalContainer'
import DayPlannerContainer from './containers/dayPlannerContainer'

class App extends Component {

  render() {
    return (
      <Router>      
        <Switch>
          <Route path="/planner">
            <PlannerContainer />
          </Route>

          <Route path="/trackers">
            <TrackerContainer />
          </Route>

          <Route path="/lists">
            <ListsContainer />
          </Route>

          <Route path="/journal">
            <JournalContainer />
          </Route>

          <Route path="/">
            <DayPlannerContainer />
          </Route>
        </Switch>
      </Router>
    )
  }
  
}

export default App


// EXAMPLE: #componentDidMount()
// componentDidMount() {
    // STATIC TEST
    // let months = ["January", "February", "March"]
    // this.props.fetchTest(months)

    // DYNAMIC TEST
    // debugger;
    // this.props.fetchTest()
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
      //   return {
        //     fetchTest: (months) => dispatch(fetchTest(months))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);





