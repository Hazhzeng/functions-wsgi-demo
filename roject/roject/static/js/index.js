import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import MainContainer from './containers';
import MainReducer from './reducers';

/* eslint-disable no-underscore-dangle */
let store = createStore(
  MainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MainContainer />
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
