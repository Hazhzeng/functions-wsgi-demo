import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import route from './route';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#221e22',
    },
    secondary: {
      main: '#5c2d1f',
    },
  },
});

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {route.map(route => <Route
          key={route.key}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />)}
      </Switch>
    </MuiThemeProvider>
  </ConnectedRouter>
);

export default App;