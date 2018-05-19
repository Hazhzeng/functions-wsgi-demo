import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { isPhoneSelector } from '../selectors/DeviceSelector';

import Blog from '../components/Blog';

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
      <Grid item xs={12} lg={12} key={'info.avatar'}>
        <Avatar src="/image/avatar.jpg" className={classes.avatar} />
      </Grid>
    );
  }

  _renderInfomation() {
    const mobileHeader = this.props.isPhone
      ? '[Mobile users do not deserve a window to the world :troll:]'
      : '';

    const title = 'Who am I? What am I doing? Where will I go?';
    const text = `
      ### Who am I?
      In someday around 1990s, my mom decided to dump me into this cruel world,
      intentionally. That was the day when I was born.

      Spending most of my time struggling, got accepted by a university called
      UNSW, a well known university but not to you.

      ### What am I doing?
      4 years later, I got my Bachelar of Engineering degree.
      Not far until I find that our university has taugh me insufficient? but
      fundamental! knowledge, here I start my own project "Pristine".

      ### Where will I go?
      To a place where everyone belongs to, or no-one belongs to. (Deep...)
    `;

    return (
      <Grid item xs={12} lg={12} key={'info.information'}>
        <pre>{mobileHeader}</pre>
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

const mapStateToProps = () => ({
  isPhone: isPhoneSelector(),
});

const InfoRedux = connect(mapStateToProps)(InfoContainer);

export default withStyles(styles)(InfoRedux)
