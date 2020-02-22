import React, { Component } from 'react';
import './assets/App.css';
import { connect } from 'react-redux'
import { fetchTest } from './actions/testAction'

import NavContainer from './containers/navContainer'
import ControlsContainer from './containers/controlsContainer'
import BodyContainer from './containers/bodyContainer'

class App extends Component {

  componentDidMount() {
    // fetch initial data
  }

  // Render all main containers.
  render() {
    return (
      <body>
        <aside id="controlsContainer">
          <ControlsContainer />
          <nav id="navContainer"><NavContainer /></nav>
        </aside>
        <section id="bodyContainer"><BodyContainer /></section>
      </body>
    )
  }

}

const mapStateToProps = state => {
  return {
    months: state.months,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTest: (months) => dispatch(fetchTest(months))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);




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
