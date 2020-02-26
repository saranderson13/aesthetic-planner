import React, { Component } from 'react';
import './assets/controls.css'
import './assets/App.css';

// ROUTER
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// ONLY NEEDED TO RUN FETCH TEST
// import { connect } from 'react-redux'
// import { fetchTest } from './actions/_testAction'

// import PlannerContainer from './containers/plannerContainer'
import TrackerContainer from './containers/trackersContainers/trackerContainer'
import ListsContainer from './containers/listsContainers/listsContainer'
import JournalContainer from './containers/journalContainers/journalContainer'
import DayPlannerContainer from './containers/dayPlannerContainers/dayPlannerContainer'

class App extends Component {

  render() {
    return (
      <Router>      
        <Switch>
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





