import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  paper: {
    textAlign: 'center',
  }
});

class HomeContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        Welcome Home
      </Paper>
    );
  }
}

export default withStyles(styles)(HomeContainer);
