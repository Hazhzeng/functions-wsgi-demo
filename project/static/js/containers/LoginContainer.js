import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';

import {
  changeUsername,
  changePassword,
  authTrigger,
} from '../actions/UserActions';

import {
  isUsernameValid,
  isPasswordValid,
  uiSelector
} from '../selectors/UserSelector';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 5,
    textAlign: 'left',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit * 3,
  },
});

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.config = {
      userDebounce: 3000, /* How many milliseconds should we wait before submit */
      timerGranularity: 10, /* How often should we update progress bar */
    }
    this.state = {
      progress: { value: 0, color: 'primary', variant: "determinate" },
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.debouncedSubmit = _.debounce(this.debouncedSubmit.bind(this), this.config.userDebounce);

    this.progressBarWaiting = this.progressBarWaiting.bind(this);
    this.progressBarError = this.progressBarError.bind(this);
    this.progressStartTimer = this.progressStartTimer.bind(this);
    this.progressStopTimer = this.progressStopTimer.bind(this);
    this.progressTimer = null;
  }

  handleUsernameChange(event) {
    this.props.changeUsername(event.target.value);
    if (this.props.isSubmitable) {
      this.progressStopTimer()
      this.progressStartTimer();
      this.debouncedSubmit();
    } else {
      this.progressBarError();
    }
  }

  handlePasswordChange(event) {
    this.props.changePassword(event.target.value);
    if (this.props.isSubmitable) {
      this.progressStopTimer()
      this.progressStartTimer();
      this.debouncedSubmit();
    } else {
      this.progressBarError();
    }
  }

  debouncedSubmit() {
    this.progressStopTimer();
    if (this.props.isSubmitable) {
      this.props.submit();
    }
  }

  progressStartTimer() {
    if (!this.progressTimer) {
      this.progressTimer = setInterval(this.progressBarWaiting, this.config.userDebounce / this.config.timerGranularity);

      const progressValue = 100 - (100.0 / this.config.timerGranularity);
      this.setState({
        ...this.state,
        progress: { value: progressValue, color: 'primary', variant: 'determinate'},
      });
    }
  }

  progressStopTimer() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  progressBarWaiting() {
    if (this.props.isSubmitable) {
      const expectedValue = this.state.progress.value - (100.0 / this.config.timerGranularity);
      const progressValue = expectedValue >= 0.0 ? expectedValue : 0;
      this.setState({
        ...this.state,
        progress: { value: progressValue, color: 'primary', variant: 'determinate'}
      });
    }
  }

  progressBarError() {
    this.progressStopTimer();
    this.setState({
      ...this.state,
      progress: { value: 100, color: 'secondary', variant: 'determinate' },
    });
  }

  _renderLoginForm() {
    const { classes } = this.props;
    const progress = this.props.ui.loading ? <LinearProgress /> : <LinearProgress {...this.state.progress} />
    return (
      <Grid item sm={12} lg={12} key={'login.form'}>
        <Paper className={classes.paper}>
          <FormControl className={classes.margin} autoComplete={'off'} >
            <Tooltip
              title='Username requires at least 8 characters without spaces in between'
              placement={'top'}
            >
              <Input
                className={classes.margin}
                name="username"
                type="text"
                disabled={this.props.ui.loading || this.props.ui.success}
                error={this.props.ui.failure}
                onChange={this.handleUsernameChange}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </Tooltip>
            <Tooltip
              title='Password requires at least 6 characters with lowercases and numbers'
              placement={'bottom'}
            >
              <Input
                className={classes.margin}
                name="password"
                type="password"
                disabled={this.props.ui.loading || this.props.ui.success}
                error={this.props.ui.failure}
                onChange={this.handlePasswordChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
              />
            </Tooltip>
          </FormControl>
          <Tooltip
            title='When all requirements are satisfied, we will login you in or register a new account for you automatically'
            placement={'top'}
          >
            { progress }
          </Tooltip>
        </Paper>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={24} direction="column" alignItems="center">
        {this._renderLoginForm()}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isSubmitable: isUsernameValid(state) && isPasswordValid(state),
  ui: uiSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeUsername: value => dispatch(changeUsername(value)),
  changePassword: value => dispatch(changePassword(value)),
  submit: () => dispatch(authTrigger()),
});

const LoginRedux =
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

export default withStyles(styles)(LoginRedux)
