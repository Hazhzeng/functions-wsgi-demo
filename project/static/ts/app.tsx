import * as React from 'react';
import { Route, Switch } from 'react-router';
import { History } from 'history';
import { routes } from './route';
import { ConnectedRouter } from 'connected-react-router';

interface AppProps {
  history: History
};

const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        {routes.map(route => <Route
          key={route.key}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />)}
      </Switch>
    </div>
  </ConnectedRouter>
);

export default App;