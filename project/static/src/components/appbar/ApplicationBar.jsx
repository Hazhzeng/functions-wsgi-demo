import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoadingIndicator from './LoadingIndicator';

import LogoutButton from './AppBarItemLogout';
import AccountButton from './AppBarItemAccount';
import BlogButton from './AppBarItemBlog';
import EditButton from './AppBarItemEdit';

class ApplicationBar extends React.PureComponent {
  _renderProgressBar() {
    return <LoadingIndicator progress={this.props.progress} />
  }

  _renderTitle() {
    return (
      <Typography
        variant='title'
        color='inherit'
        className={this.props.classes.flex}
      >
        {this.props.title}
      </Typography>
    );
  }

  _renderAppBarItems() {
    return (
      <div>
        <BlogButton />
        <EditButton />
        <AccountButton />
        <LogoutButton />
      </div>
    );
  }

  render() {
    return (
      <Grid item xs={12} lg={12} className={this.props.classes.root}>
        <AppBar position={'fixed'}>
          <Toolbar>
            {this._renderProgressBar()}
            {this._renderTitle()}
            {this._renderAppBarItems()}
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}

ApplicationBar.propTypes = {
  title: PropTypes.string,
  progress: PropTypes.number.isRequired,
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 3,
  },
  flex: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3,
  },
});

export const ApplicationBarWithStyle = withStyles(styles)(ApplicationBar);