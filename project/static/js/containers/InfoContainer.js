import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import Blog from '../components/Contents/Blog';

const styles = () => ({
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
    const title = 'Who am I? What am I doing? Where will I go?';
    const text = `
      ### Who am I?
      In someday around 1990s, my mom decided to dump me into this cruel world,
      intentionally. That was the day when I was born.

      Spending most of my time struggling, got accepted by a university called
      UNSW, a well know university but not to you.
      I mean, it is not taken from granted for a university to get to top 50 in
      QS ranking by dumping a lot of money into it.

      Interestingly, our university has changed its name
      for 3 times in the most recent 4 years, ordering by time:

      1. University of New South Wales
      2. University of New South Wales Australia
      3. University of New South Wales Sydney

      4  years later, I got my Bachelar of Engineering.
      Not far until I found that uni has taugh me insufficient but
      fundamental knowledge, here I start my web dev project.

      # *WHAT A LOSER...*
    `;

    return (
      <Grid item sm={12} lg={12} key={'info.information'}>
        <Blog title={title} text={text} />
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
