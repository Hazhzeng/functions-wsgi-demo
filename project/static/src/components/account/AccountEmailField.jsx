import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

class AccountEmailField extends React.Component {
  render() {
    return (
      <Grid item sm={8} lg={7}>
        <TextField
          id="email"
          value={this.props.value}
          label={this.props.label}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          className={this.props.classes.textField}
          margin="normal"
          fullWidth
          autoFocus
          required
        />
      </Grid>
    );
  }
}

AccountEmailField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

const styles = (theme) => ({
  textField: {
    marginTop: theme.spacing.unit * 20,
  }
});

export const AccountEmailFieldWithStyle = withStyles(styles)(AccountEmailField);