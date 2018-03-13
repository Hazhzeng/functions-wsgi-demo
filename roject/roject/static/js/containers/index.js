import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100px',
  },
});

class MainContainer extends Component {
  render() {
    const { classes, stupid } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={4} sm={3}>
            <Paper className={classes.paper}>{stupid}</Paper>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Paper className={classes.paper}>Post</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stupid: 'focus',
});

export default withStyles(styles)(connect(mapStateToProps)(MainContainer));
