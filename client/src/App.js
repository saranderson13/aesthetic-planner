import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchDays, fetchMonthsForWidget } from './actions/controlsActions'
import { fetchUser } from './actions/userActions'

// STYLE SHEETS
import './assets/userForms.css'
import './assets/trackers.css'
import './assets/lists.css'
import './assets/journal.css'
import './assets/controls.css'
import './assets/App.css'

// ONLY NEEDED TO RUN FETCH TEST
// import { fetchTest } from './actions/_testAction'


// MAIN PAGE CONTAINERS
  // PlannerContainer IS FOR FUTURE IMPLEMENTATION OF WEEKLY AND MONTHLY CALENDAR PAGES
  // import PlannerContainer from './containers/plannerContainer'
import SignupPageContainer from './containers/signupPageContainer'
import LoginPageContainer from './containers/loginPageContainer'
import TrackerContainer from './containers/trackersContainers/trackerContainer'
import ListsContainer from './containers/listsContainers/listsContainer'
import JournalContainer from './containers/journalContainers/journalContainer'
import DayPlannerContainer from './containers/dayPlannerContainers/dayPlannerContainer'
import LoadingPage from './containers/loadingPageContainer'

class App extends Component {

  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchDays()
    this.props.fetchMonthsForWidget() 
  }

  componentDidUpdate() {
    console.log(this.props)
    debugger;
    // if (this.props.user)
  }

  confirmAllFetchesAndLoggedIn = () => {
    return this.props.user.logged_in && this.props.currentDayId && this.props.currentMonthId
  }

  confirmAllFetchesAndNotLoggedIn = () => {
    return !this.props.user.logged_in && this.props.currentDayId && this.props.currentMonthId
  }

  redirectFromEmptyPath = () => {
    if( this.confirmAllFetchesAndLoggedIn() ) {
      return <Redirect to={`/day-planner/${this.props.currentDayId}`} />
    } else if ( this.confirmAllFetchesAndNotLoggedIn() ) {
      return <Redirect to={"/login"} />
    } else {
      return <LoadingPage />
    }
  }

  redirectIfLoggedIn = (destination, componentName) => {
    const Component = componentName
    if(this.confirmAllFetchesAndNotLoggedIn()) {
      return (
        <Route 
            path = {`${destination}`}
            component={ Component } />
      )
    } else if (this.confirmAllFetchesAndLoggedIn()) {
      return (
        <Redirect to={`/day-planner/${this.props.currentDayId}`} />
      )
    } else return <LoadingPage />
  }

  redirectIfNotLoggedIn = (destination, componentName) => {
    const Component = componentName
    if (this.confirmAllFetchesAndLoggedIn()) {
      // NOTE: '/lists' route does not use match, but it is harmlessly passed.
      return (
        <Route 
            path = {`${destination}`}
            component={ ({match}) => (<Component match={match} />)} />
      )
    } else if (this.confirmAllFetchesAndNotLoggedIn()) {
      return <Redirect to={"/login"} />
    } 
  }

  getCurrentTrackersLink = () => {
    if (!!this.props.currentMonthId) {
      return this.props.user.logged_in ? <Redirect to={`/trackers/${this.props.currentMonthId}`} /> : <Redirect to={'/login'} />
    } else {
      return <LoadingPage />
    }
  }
  
  render() {
    return (
      <Router>      
        <Switch>
          <Route
            path="/signup"
            component={ LoadingPage } >
            { this.redirectIfLoggedIn("/signup", SignupPageContainer) }
          </Route>

          <Route
            path="/login"
            component={ LoadingPage } >
            { this.redirectIfLoggedIn("/login", LoginPageContainer) }
          </Route>

          <Route 
            path="/day-planner/:id"
            component={ LoadingPage } >
            { this.redirectIfNotLoggedIn("/day-planner/:id", DayPlannerContainer) }
          </Route>

          <Route 
            path="/trackers/:monthId"
            component={ LoadingPage } >
            { this.redirectIfNotLoggedIn("/trackers/:monthId", TrackerContainer) }
          </Route>

          <Route 
            path="/lists"
            component={ LoadingPage } >
            { this.redirectIfNotLoggedIn("/lists", ListsContainer) }
          </Route>

          <Route 
            path="/journal/:id"
            component={ LoadingPage } >
            { this.redirectIfNotLoggedIn("/journal/:id", JournalContainer) }
          </Route>
          
          <Route path="/trackers">
            { this.getCurrentTrackersLink() }
          </Route>

          <Route path="/">
            { this.redirectFromEmptyPath() }
          </Route>
        </Switch>
      </Router>
    )
  }
  
}

const mapStateToProps = state => {
  return({
    user: state.user,
    days: state.controls.days,
    loadingDays: state.controls.loadingDays,
    currentDayId: state.controls.currentDayId,
    currentMonthId: state.controls.currentMonth.id
  })
}

const mapDispatchToProps = dispatch => {
  return ({
      fetchUser: (userInfo) => dispatch(fetchUser(userInfo)),
      fetchDays: () => dispatch(fetchDays()),
      fetchMonthsForWidget: () => dispatch(fetchMonthsForWidget())
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





