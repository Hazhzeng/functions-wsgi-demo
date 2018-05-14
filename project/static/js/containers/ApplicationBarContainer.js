import { capitalize } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';

import HomeSelector from '../selectors/HomeSelector';
import UserSelector from '../selectors/UserSelector';

import { toggleMenu } from '../actions/HomeActions';

const styles = theme => ({
  appbar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 16,
  },
});

class ApplicationBarContainer extends Component {
  render() {
    const { classes, username } = this.props;
    return (
      <AppBar className={classes.appbar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={this.props.switchMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            {username ? capitalize(username) : 'Pristine'}
          </Typography>
        </Toolbar>
        {this.props.loading && <LinearProgress />}
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  username: UserSelector.usernameSelector(),
  loading: HomeSelector.uiSelector(state).loading,
});

const mapDispatchToProps = dispatch => ({
  switchMenu: () => dispatch(toggleMenu()),
});

const ApplicationBarRedux =
  connect(mapStateToProps, mapDispatchToProps)(ApplicationBarContainer);

export default withStyles(styles)(ApplicationBarRedux);
