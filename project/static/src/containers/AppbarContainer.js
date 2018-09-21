import React from 'react';
import { connect } from 'react-redux';
import { ApplicationBar } from '../components/appbar';

class Appbar extends React.PureComponent {
  render() {
    return (
      <ApplicationBar
        title="Pristine"
        progress={this.props.progress}
      />
    )
  }
}

export const AppbarContainer = connect(
  state => ({
    progress: state.ui.progress,
  })
)(Appbar);