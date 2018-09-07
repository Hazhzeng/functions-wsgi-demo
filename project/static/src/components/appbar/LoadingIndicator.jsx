import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoadingIndicator extends React.PureComponent {
  render() {
    return (
      <CircularProgress
        color="inherit"
        variant="determinate"
        size={20}
        value={this.props.progress}
      />
    );
  }
}

LoadingIndicator.propTypes = {
  progress: PropTypes.number,
};

export default LoadingIndicator;