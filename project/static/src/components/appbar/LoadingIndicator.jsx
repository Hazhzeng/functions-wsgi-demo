import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const progressMapping = {
  TRIGGER: 20,
  REQUEST: 40,
  SUCCESS: 80,
  FAILURE: 80,
  FULFILL: 100,
}

class LoadingIndicator extends React.PureComponent {
  render() {
    let progress = this.props.progressNumber;
    if (this.props.progressString) {
      progress = progressMapping[this.props.progressString];
    }

    return (
      <CircularProgress
        color="inherit"
        variant="determinate"
        size={20}
        value={progress}
      />
    );
  }
}

LoadingIndicator.propTypes = {
  progressNumber: PropTypes.number,
  propgreeString: PropTypes.oneOf([
    'TRIGGER',
    'REQUEST',
    'SUCCESS',
    'FAILURE',
    'FULFILL'
  ]),
};

export default LoadingIndicator;