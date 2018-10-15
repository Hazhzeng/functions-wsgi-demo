import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import EmailFilled from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';

import WechatModal from './WechatModal';

import 'brace/mode/markdown';
import 'brace/theme/github';

import UglyGuy from '../../../image/uglyguy.jpg';
import WechatLogo from '../../../image/wechat-logo.png';
import GithubLogo from '../../../image/github-logo.png';

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wechatModal: false
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleWechat = this.handleWechat.bind(this);
    this.handleGithub = this.handleGithub.bind(this);
  }

  handleEmail() {
    window.open('mailto:zenghanzhangac@gmail.com', '_top');
  }

  handleWechat() {
    this.setState(
      _.assignIn(this.state, { wechatModal: !this.state.wechatModal })
    );
  }

  handleGithub() {
    window.open('https://github.com/RogerTsang/Pristine', '_blank');
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
          Super Junior Software Engineer
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
        <IconButton aria-label="github" onClick={this.handleGithub}>
          <img alt="GitHub" src={`/dist/${GithubLogo}`} width={'24'} />
        </IconButton>
      </div>
    );
  }

  renderModals() {
    return (
      <div>
        <WechatModal
          isOpen={this.state.wechatModal}
          handleClose={this.handleWechat}
        />
      </div>
    )
  }

  render() {
    return (
      <Grid item xs={12} lg={6} className={this.props.classes.grid}>
        {this.renderAvatar()}
        {this.renderContactDetail()}
        {this.renderModals()}
      </Grid>
    );
  }
}

const styles = (theme) => ({
  grid: {
    marginTop: theme.spacing.unit * 8,
  },
  avatar: {
    width: 240,
    height: 240,
  },
  avatarDiv: {
    marginBottom: theme.spacing.unit * 2,
    justifyContent: 'center',
    display: 'flex',
  },
  contactDetailDiv: {
    marginBottom: theme.spacing.unit * 2,
    justifyContent: 'center',
    display: 'flex',
  }
});

export const AboutMeWithStyle = withStyles(styles)(AboutMe);