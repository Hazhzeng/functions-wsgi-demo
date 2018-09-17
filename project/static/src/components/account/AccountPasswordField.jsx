import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

class AccountPasswordField extends React.Component {
  render() {
    return (
      <Grid item sm={8} lg={7}>
        <TextField
          id="password"
          type="password"
          value={this.props.value}
          label={this.props.label}
          onChange={this.props.handleChange}
          className={this.props.classes.textField}
          margin="normal"
          fullWidth
          required
        />
      </Grid>
    );
  }
}

AccountPasswordField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
};

const styles = (theme) => ({
  textField: {
    marginTop: theme.spacing.unit * 16,
  }
});

export const AccountPasswordFieldWithStyle =
  withStyles(styles)(AccountPasswordField);