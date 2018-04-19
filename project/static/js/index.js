import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppContainer } from 'react-hot-loader';

import MainContainer from './containers';
import MainReducer from './reducers';
import MainSaga from './sagas';
import { RouteConfig } from './Routes';

/* eslint-disable no-underscore-dangle */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  MainReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(MainSaga);
/* eslint-enable */

const _App = () => (
  <AppContainer>
    <Provider store={store}>
      <MainContainer routes={RouteConfig} />
    </Provider>
  </AppContainer>
);

ReactDOM.render(
  <_App />,
  document.getElementById("app")
);

export default _App;
