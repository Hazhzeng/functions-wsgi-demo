import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import MainContainer from './containers';
import MainReducer from './reducers';

let store = createStore(MainReducer);

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
