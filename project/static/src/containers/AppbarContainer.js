import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { ApplicationBar } from '../components/appbar';

import { isPhone } from '../utils';

class Appbar extends React.PureComponent {
  render() {
    const user = _.head(Object.values(this.props.loggedInUsers));
    const title = user ? user.email : 'Pristine';
    return (
      <ApplicationBar
        title={isPhone ? '' : title}
        semaphore={this.props.semaphore}
      />
    )
  }
}

export const AppbarContainer = connect(
  state => ({
    semaphore: state.ui.loadingSemaphore,
    loggedInUsers: state.account.loggedInUserById,
  })
)(Appbar);