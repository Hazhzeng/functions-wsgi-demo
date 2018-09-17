import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export class AccountEmailField extends React.Component {
  render() {
    return (
      <TextField
        id="email"
        value={this.props.value}
        label={this.props.label}
        onChange={this.props.handleChange}
        margin="normal"
      />
    );
  }
}

AccountEmailField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
};