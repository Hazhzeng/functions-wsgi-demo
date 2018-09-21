import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

class AccountActionButton extends React.Component {
  render() {
    return (
      <Grid item xs={12}>
        <Button
          id="submit"
          type="submit"
          disabled={this.props.isDisabled}
          className={this.props.classes.button}
          onClick={this.props.handleClick}
          variant={this.props.isDisabled ? 'text' : 'contained'}
          fullWidth
        >
          {this.props.value}
        </Button>
      </Grid>
    );
  }
}

AccountActionButton.propTypes = {
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleClick: PropTypes.func,
};

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing.unit * 12,
  }
});

export const AccountActionButtonWithStyle = withStyles(styles)(AccountActionButton);