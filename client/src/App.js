import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchTest } from './actions/testAction'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Main App Page</h1>
      </div>
    )
  }
}

export default App;
