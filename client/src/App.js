import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchTest } from './actions/testAction'

class App extends Component {

  componentDidMount() {
    let months = ["January", "February", "March"]
    this.props.fetchTest(months)
  }

  render() {
    return (
      <div>
        <h1>Main App Page</h1>
        {this.props.months.map( m => { return <li>{m}</li>})}
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