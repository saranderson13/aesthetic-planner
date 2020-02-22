import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import testReducer from './reducers/testReducer'

const store = createStore(
    testReducer, 
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

// const store = createStore(testReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
// NOTE: DOING THE STORE THAT WAY GIVES THE FOLLOWING ERROR:
// "It looks like you are passing several store enhancers to createStore()"
// compose() is needed so that more than two arguments can be passed to createStore().
// I have no idea why it worked with three arguments in the CatList lab...

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
