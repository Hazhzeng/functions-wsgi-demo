import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import MenuListItem from '../components/DrawerMenu/MenuListItem';

const styles = theme => ({
  drawer: {
    position: 'relative',
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
});

class DrawerMenuContainer extends Component {
  _renderMenuList() {
    return (
      <List component="nav">
        <MenuListItem name='home' />
        <MenuListItem name='post' />
        <MenuListItem name='info' />
        <Divider />
        <MenuListItem name='login' />
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
    const { classes, anchor } = this.props;
    return (
      <Drawer
          variant="permanent"
          classes={{ paper: classes.drawer }}
          anchor={anchor}
      >
      {this._renderList()}
      </Drawer>
    );
  }
}

const mapStateToProps = () => ({
  anchor: 'left',
});

const DrawerMenuRedux = connect(mapStateToProps)(DrawerMenuContainer);

export default withStyles(styles)(DrawerMenuRedux);
