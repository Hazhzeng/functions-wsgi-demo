import React from 'react';
import { connect } from 'react-redux';
import { ApplicationBar } from '../components/appbar';

class Appbar extends React.PureComponent {
  render() {
    return (
      <ApplicationBar
        title="Pristine"
        view={this.props.view}
        progress={this.props.progress}
      />
    )
  }
}

export const AppbarContainer = connect(
  state => ({
    view: state.view.currentView,
    progress: state.ui.progress,
  })
)(Appbar);