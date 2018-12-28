import _ from 'lodash';
import React from 'react';
import Cookies from 'js-cookie';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import EmailFilled from '@material-ui/icons/Email';
import AttachFileFilled from '@material-ui/icons/AttachFile';
import IconButton from '@material-ui/core/IconButton';

import {
  AccountCircleOutlined,
  CalendarTodayOutlined,
  EditOutlined,
  InfoOutlined,
  ExitToAppOutlined,
  TimelineOutlined,
} from '@material-ui/icons';

import WechatModal from './WechatModal';

import 'brace/mode/markdown';
import 'brace/theme/github';

import UglyGuy from '../../../image/uglyguy.jpg';
import WechatLogo from '../../../image/wechat-logo.png';
import GithubLogo from '../../../image/github-logo.png';
import ResumeFile from '../../../file/Hanzhang_ZENG_resume.pdf';

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wechatModal: false,
      checkSkip: Boolean(Number(Cookies.get('skipPersonalPage') || '0'))
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleWechat = this.handleWechat.bind(this);
    this.handleGithub = this.handleGithub.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.handleCheckSkip = this.handleCheckSkip.bind(this);
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

  handleResume() {
    window.open(`/dist/${ResumeFile}`, '_blank');
  }

  handleCheckSkip() {
    const nextCheckSkip = !this.state.checkSkip;

    if (nextCheckSkip) {
      Cookies.set('skipPersonalPage', '1', { expires: 30 });
    } else {
      Cookies.set('skipPersonalPage', '0', { expires: 30 });
    }

    this.setState(
      _.assignIn(this.state, { checkSkip: nextCheckSkip })
    );
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
      <div className={this.props.classes.contactDetailDiv}>
        <IconButton aria-label="resume" onClick={this.handleResume}>
          <AttachFileFilled />
        </IconButton>
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

  renderAbout() {
    return (
      <div className={this.props.classes.aboutDiv}>
        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          What is this website?
        </Typography>
        <Typography variant='body1' className={this.props.classes.typoGap}>
          This website (rogerzeng.com) is my very own personal project, Pristine.
          Pristine is named after redux-form property 'pristine', which is a state when a field has never been touched.
          It is also the primitive with everything in your mind before you type it out or let others know.
          If you are using this website as a guest, the title of the application bar will default to Pristine; you are not allow to post any blogs.
          If you want to post something anonymously, you can choose to register an account on my website.
        </Typography>

        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          Why is it special?
        </Typography>
        <Typography variant='body1' className={this.props.classes.typoSpace}>
          First of all, I build it all by myself (i.e. getting a domain name, hosting the server on cloud, setting up Nginx, Gunicorn, Flask, Webpack,
          building the actual application), a one man army. For me, a junior developer, the experience of building Pristine is priceless.
          Again, it is my very first project, what I complete after university.
        </Typography>
        <Typography variant='body1' className={this.props.classes.typoGap}>
          The frontend is implemented 100% in React. The user interface is built based on Material UI.
          If you are interested in how I actually achieve it, please follow the <a target="_blank" href="https://github.com/RogerTsang/Pristine">link</a>.
        </Typography>

        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          How to use it?
        </Typography>
        <Typography variant='body1' className={this.props.classes.typoGap}>
          Pristine, a blog sharing website, helps you track and share your stuff anonymously.
          The navigation bar gives you most of control in the application.
          I know the simplicity of icon-based design makes the website convoluted. Let me help you out.
        </Typography>

        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          <AccountCircleOutlined /> binds your soul to Pristine.
        </Typography>
        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          <CalendarTodayOutlined /> peep satisfaction.
        </Typography>
        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          <EditOutlined /> reveal your destiny.
        </Typography>
        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          <InfoOutlined /> wanna see the handsome?
        </Typography>
        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          <ExitToAppOutlined /> relationship terminator.
        </Typography>
        <Typography variant='subheading' className={this.props.classes.typoSpace}>
          <TimelineOutlined /> these days, these days...
        </Typography>

      </div>
    )
  }

  renderSkipCheckbox() {
    return (
      <div className={this.props.classes.checkboxDiv}>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkSkip}
              onChange={this.handleCheckSkip}
              value="checkSkip"
              color="primary"
            />
          }
          label="Skip personal page next time"
        />
      </div>
    );
  }

  render() {
    return (
      <Grid item xs={12} lg={6} className={this.props.classes.grid}>
        {this.renderAvatar()}
        {this.renderContactDetail()}
        {this.renderModals()}
        {this.renderAbout()}
        {this.renderSkipCheckbox()}
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
  },
  aboutDiv: {
    marginTop: theme.spacing.unit * 3,
    justifyContent: 'center',
  },
  checkboxDiv: {
    marginTop: theme.spacing.unit * 2,
    justifyContent: 'center',
    display: 'flex',
  },
  typoSpace: {
    marginBottom: theme.spacing.unit,
  },
  typoGap: {
    marginBottom: theme.spacing.unit * 3,
  },
  applicationBar: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
  }
});

export const AboutMeWithStyle = withStyles(styles)(AboutMe);