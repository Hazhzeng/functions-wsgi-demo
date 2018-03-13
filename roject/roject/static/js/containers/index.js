import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import ApplicationBarContainer from './ApplicationBarContainer';
import ContentContainer from './ContentContainer';
import DrawerMenuContainer from './DrawerMenuContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex',
    width: '100%',
  },
});

class MainContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ApplicationBarContainer />
        <DrawerMenuContainer />
        <ContentContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  title: 'dump',
});

export default withStyles(styles)(connect(mapStateToProps)(MainContainer));
