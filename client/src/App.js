import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchTest } from './actions/testAction'

class App extends Component {

  componentDidMount() {
    // STATIC TEST
    // let months = ["January", "February", "March"]
    // this.props.fetchTest(months)

    // DYNAMIC TEST
    this.props.fetchTest()
  }

  render() {
    return (
      <div>
        <h1>Main App Page</h1>
        {this.props.months.map( m => { return <li>{m.name}</li>})}
      </div>
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
