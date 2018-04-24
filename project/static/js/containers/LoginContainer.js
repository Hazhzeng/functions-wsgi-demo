import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { FormControl } from 'material-ui/Form';
import Input, { InputAdornment } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

import AccountCircle from 'material-ui-icons/AccountCircle';
import Lock from 'material-ui-icons/Lock';

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
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    console.log('username:', event.target.value);
  }

  handlePasswordChange(event) {
    console.log('password:', event.target.value);
  }

  _renderLoginForm() {
    const { classes } = this.props;
    return (
      <Grid item sm={12} lg={12} key={'login.form'}>
        <Paper className={classes.paper}>
          <FormControl className={classes.margin} >
            <Input
              className={classes.margin}
              name="username"
              type="text"
              onChange={this.handleUsernameChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            <Input
              className={classes.margin}
              name="password"
              type="password"
              onChange={() => console.log('!')}
              startAdornment={
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              }
            />
          </FormControl>
        </Paper>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container
        spacing={24}
        direction="column"
        alignItems="center"
      >
        {this._renderLoginForm()}
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginContainer)
