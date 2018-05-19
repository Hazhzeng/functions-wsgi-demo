import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { isPhoneSelector } from '../selectors/DeviceSelector';

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

  _renderGithubLink() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} lg={12} key={'github.avatar'}>
        For a more serious introduction of what Pristine is about,
        tease the Octocat!
        <a href="https://github.com/RogerTsang/Pristine">
          <Avatar src="/image/github.jpg" className={classes.avatar} />
        </a>
      </Grid>
    );
  }

  _renderInfomation() {
    const mobileHeader = this.props.isPhone
      ? '[Use desktop for better experience (e.g. gaming!)]'
      : '';
    return (
      <Grid item xs={12} lg={12} key={'info.information'}>
        <pre>{mobileHeader}</pre>
        <h3>Who am I? What am I doing? Where will I go?</h3>
        <pre>### Who am I?</pre>
        <p>In someday around 1990s, my mom decided to dump me into this cruel
          world, intentionally. That was the day when I was born.</p>
        <p>Spending most of my time struggling, got accepted by a university
          called UNSW, a well known university but not to you.</p>
        <pre>### What am I doing?</pre>
        <p>4 years later, I got my Bachelar of Engineering degree.</p>
        <p>Not far until I find that our university has taugh me insufficient?
          but fundamental! knowledge, here I start my own project "Pristine".</p>
        <pre>### Where will I go?</pre>
        <p>To a place where everyone belongs to, or no-one belongs to.
          (try to be deep...)</p>
        <hr/>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={24}>
        {this._renderAvatar()}
        {this._renderInfomation()}
        {this._renderGithubLink()}
      </Grid>
    );
  }
}

const mapStateToProps = () => ({
  isPhone: isPhoneSelector(),
});

const InfoRedux = connect(mapStateToProps)(InfoContainer);

export default withStyles(styles)(InfoRedux)
