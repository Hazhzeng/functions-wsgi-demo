import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';

class AccountEmailField extends React.Component {
  render() {
    return (
      <Grid item xs={12}>
        <Tooltip
          title={this.props.tooltip}
          placement="bottom"
        >
          <TextField
            id="email"
            value={this.props.value}
            label={this.props.label}
            onChange={this.props.handleChange}
            onFocus={this.props.handleFocus}
            className={this.props.classes.textField}
            error={this.props.hasError}
            margin="normal"
            fullWidth
            autoFocus
            required
          />
        </Tooltip>
      </Grid>
    );
  }
}

AccountEmailField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  hasError: PropTypes.bool,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func,
};

const styles = (theme) => ({
  textField: {
    marginTop: theme.spacing.unit * 12,
  }
});

export const AccountEmailFieldWithStyle = withStyles(styles)(AccountEmailField);