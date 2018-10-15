import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import EmailFilled from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';

import 'brace/mode/markdown';
import 'brace/theme/github';

import UglyGuy from '../../../image/uglyguy.jpg';
import WechatLogo from '../../../image/wechat-logo.png';

class AboutMe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleWechat = this.handleWechat.bind(this);
  }

  handleEmail(event) {
    event.preventDefault();
    window.open('mailto:zenghanzhangac@gmail.com', '_blank');
  }

  handleWechat(event) {
    event.preventDefault();
  }

  renderAvatar() {
    return (
      <div>
        <div className={this.props.classes.avatarDiv}>
          <Avatar
            alt="Hanzhang Zeng"
            src={`/dist/${UglyGuy}`}
            className={this.props.classes.avatar}
          />
        </div>
        <Typography variant='headline' align='center'>Hanzhang Zeng</Typography>
        <Typography variant='subheading' align='center'>
          Software Engineer @ Freelancer Pty. Ltd.
        </Typography>
      </div>
    );
  }

  renderContactDetail() {
    return (
      <div className={this.props.classes.contactDetailDiv} key='email'>
        <IconButton aria-label="email" onClick={this.handleEmail}>
          <EmailFilled />
        </IconButton>
        <IconButton aria-label="wechat" onClick={this.handleWechat}>
          <img alt="WeChat" src={`/dist/${WechatLogo}`} width={'24'} />
        </IconButton>
      </div>
    );
  }

  render() {
    return (
      <Grid item xs={12} lg={6} className={this.props.classes.grid}>
        {this.renderAvatar()}
        {this.renderContactDetail()}
      </Grid>
    );
  }
}

const styles = (theme) => ({
  grid: {
    marginTop: theme.spacing.unit * 5,
  },
  avatar: {
    width: 240,
    height: 240,
  },
  avatarDiv: {
    marginBottom: theme.spacing.unit,
    justifyContent: 'center',
    display: 'flex',
  },
  contactDetailDiv: {
    marginBottom: theme.spacing.unit / 2,
    justifyContent: 'center',
    display: 'flex',
  }
});

export const AboutMeWithStyle = withStyles(styles)(AboutMe);