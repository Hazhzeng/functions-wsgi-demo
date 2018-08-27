import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { connectRouter } from 'connected-react-router';

import { ApplicationState } from './reducer';
import { store, history } from './store';
import App from './app';

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}

render();

if (module.hot) {
    module.hot.accept('./App', () => {
        render()
    })

    module.hot.accept('./reducers', () => {
        store.replaceReducer(connectRouter(history)(ApplicationState))
    })
}