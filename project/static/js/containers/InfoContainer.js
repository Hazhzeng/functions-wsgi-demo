import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import Blog from '../components/Contents/Blog';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 5,
    textAlign: 'left',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  avatar: {
    width: 120,
    height: 120,
    margin: 10,
  }
});

class InfoContainer extends Component {
  constructor(props) {
    super(props);
  }

  _renderAvatar() {
    const { classes } = this.props;
    return (
      <Grid item sm={12} lg={12} key={'info.avatar'}>
        <Avatar src="/image/avatar.jpg" className={classes.avatar} />
      </Grid>
    );
  }

  _renderInfomation() {
    const { classes } = this.props;
    const title = 'Who am I? What am I doing? Where will I go?';
    const text = `
      ### Who am I?
      In someday around 1990s, my mom decide to dump me into this cruel world,
      partially intentionally, that was the day I born.

      Spending most of my time struggling before my 18, got accepted by a
      university called University of New South Wale a university known to the
      world but not in China. I mean, it is not taken from granted for a uni to
      get to top 50 in QS ranking, but, come on, our uni has changed its name
      for 3 times in recent 4 years, ordering by time:

      1. University of New South Wales
      2. University of New South Wales Australia
      3. University of New South Wales Sydney

      4  years later, I got my Bachelar of Engineering, more specifically,
      majoring Computer Engineering. Not far until I found that uni has taugh me
      insufficient but fundamental knowledge, here I start my web dev career.

      # *WHAT A LOSER...*
    `;

    return (
      <Grid item sm={12} lg={12} key={'info.information'}>
        <Paper className={classes.paper}>
          <Blog title={title} text={text} />
        </Paper>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={24}>
        {this._renderAvatar()}
        {this._renderInfomation()}
      </Grid>
    );
  }
}

export default withStyles(styles)(InfoContainer)
