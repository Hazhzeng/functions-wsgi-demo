import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

class AccountPasswordField extends React.Component {
  render() {
    return (
      <Grid item xs={12}>
        <TextField
          id="password"
          type="password"
          value={this.props.value}
          label={this.props.label}
          helperText={this.props.tooltip}
          onChange={this.props.handleChange}
          className={this.props.classes.textField}
          error={this.props.hasError}
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
  tooltip: PropTypes.string,
  hasError: PropTypes.bool,
  handleChange: PropTypes.func,
};

const styles = (theme) => ({
  textField: {
    marginTop: theme.spacing.unit * 12,
  }
});

export const AccountPasswordFieldWithStyle =
  withStyles(styles)(AccountPasswordField);