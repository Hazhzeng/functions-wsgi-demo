import React from 'react';
import { connect } from 'react-redux';
import { AccountEmailField } from '../components/account';

class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.state = {
      email: '',
    };
  }

  handleEmailChange(value) {
    this.setState({ email: value });
  }

  render() {
    return (
      <AccountEmailField
        label="Please Enter Your Email"
        value={this.props.view}
        handleChange={this.handleEmailChange}
      />
    )
  }
}

export const AccountContainer = connect(
  state => ({
    view: state.view.currentView,
    progress: state.ui.progress,
  })
)(Account);