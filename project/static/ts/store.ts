import { Store, createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { ApplicationState } from './reducer';
import sagaWatchers from './sagas';
import createSagaMiddleware from 'redux-saga';

const websiteMode = process.env.PRISTINE_MODE;
const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();
const connectedRouterMiddleware = routerMiddleware(history);

export let store = undefined;
if (websiteMode === 'development') {
    store = createStore(
        connectRouter(history)(ApplicationState),
        compose(
            applyMiddleware(sagaMiddleware, connectedRouterMiddleware),
            window['devToolsExtension'] ? window['devToolsExtension']() : f => f
        )
    );
} else if (websiteMode === 'production') {
    store = createStore(
        connectRouter(history)(ApplicationState),
        applyMiddleware(sagaMiddleware, connectedRouterMiddleware)
    );
} else {
    throw new Error('Failed to initialise due to unknown websiteMode');
}

sagaMiddleware.run(sagaWatchers);