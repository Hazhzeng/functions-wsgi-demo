import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import { logout } from '../actions/UserActions';

import { usernameSelector } from '../selectors/UserSelector';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 5,
    textAlign: 'center',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

class LogoutContainer extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24} direction="column" alignItems="center">
          <Paper className={this.props.classes.paper}>
            Logging out: {this.props.username}
            <hr />
            <LinearProgress color="secondary" />
          </Paper>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = () => ({
  username: usernameSelector(),
});

const mapDispathToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
});

const LogoutRedux =
  connect(mapStateToProps, mapDispathToProps)(LogoutContainer);

export default withStyles(styles)(LogoutRedux)
