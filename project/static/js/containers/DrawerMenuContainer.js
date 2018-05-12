import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { isUserLoggedinSelector } from '../selectors/UserSelector';

import MenuListItem from '../components/DrawerMenu/MenuListItem';

const styles = theme => ({
  drawer: {
    position: 'relative',
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
});

class DrawerMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.config = {
      anchor: 'left',
    };
  }

  _renderMenuList() {
    return (
      <List component="nav">
        <MenuListItem name='home' isLoggedIn={this.props.isLoggedIn} />
        <MenuListItem name='post' isLoggedIn={this.props.isLoggedIn} />
        <MenuListItem name='info' isLoggedIn={this.props.isLoggedIn} />
        <Divider />
        <MenuListItem name='login' isLoggedIn={this.props.isLoggedIn} />
      </List>
    );
  }

  _renderList() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.toolbar} />
        {this._renderMenuList()}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer
          variant="permanent"
          classes={{ paper: classes.drawer }}
          anchor={this.config.anchor}
      >
      {this._renderList()}
      </Drawer>
    );
  }
}

const mapStateToProps = () => ({
  isLoggedIn: isUserLoggedinSelector(),
});

const DrawerMenuRedux = connect(mapStateToProps)(DrawerMenuContainer);

export default withStyles(styles)(DrawerMenuRedux);
