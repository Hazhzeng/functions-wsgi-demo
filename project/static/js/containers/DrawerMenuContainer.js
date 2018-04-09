import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  _renderList() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.toolbar} />
        <List component="nav">
          <MenuListItem name='home' />
          <MenuListItem name='post' />
          <MenuListItem name='info' />
        </List>
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
