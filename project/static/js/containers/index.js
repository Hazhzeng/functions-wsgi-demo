import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { RouteWithSubRoutes } from '../Routes';

import ApplicationBarContainer from './ApplicationBarContainer';
import DrawerMenuContainer from './DrawerMenuContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class MainContainer extends Component {
  render() {
    const { classes, routes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <ApplicationBarContainer />
          <DrawerMenuContainer />

          <main className={classes.content}>
            <div className={classes.toolbar} />
            { routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))}
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(MainContainer);
