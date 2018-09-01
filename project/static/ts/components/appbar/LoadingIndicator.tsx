import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface ILoadingIndicatorProps {
  progressNumber?: number,
  progressString?: 'TRIGGER'|'REQUEST'|'SUCCESS'|'FAILURE'|'FULFILL',
};

const progressMapping = {
  TRIGGER: 20,
  REQUEST: 40,
  SUCCESS: 80,
  FAILURE: 80,
  FULFILL: 100,
}

export class LoadingIndicator extends React.PureComponent<ILoadingIndicatorProps> {
  render() {
    let progress: number = this.props.progressNumber;
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