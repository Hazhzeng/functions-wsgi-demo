import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoadingIndicator extends React.PureComponent {
  render() {
    return (
      <CircularProgress
        color="inherit"
        variant={this.props.mutex > 0 ? 'indeterminate' : 'determinate'}
        size={20}
        value={100}
      />
    );
  }
}

LoadingIndicator.propTypes = {
  mutex: PropTypes.number,
};

export default LoadingIndicator;