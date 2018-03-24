import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader';

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

const _App = () => (
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>
);

ReactDOM.render(
  <_App />,
  document.getElementById("app")
);

export default _App;
