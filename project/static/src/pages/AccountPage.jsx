import React from 'react';
import { connect } from 'react-redux';
import PageBase from './PageBase';
import { AccountContainer } from '../containers';
import { view } from '../actions/ViewActions';

class Account extends PageBase {
  renderIf() {
    const renderOnView = [view.ACCOUNT_VIEW];
    return renderOnView.includes(this.props.view);
  }

  renderComponent() {
    return <AccountContainer />;
  }
}

export const AccountPage = connect(
  state => ({
    view: state.view.currentView
  })
)(Account);