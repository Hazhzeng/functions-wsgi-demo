import React from 'react';
import { connect } from 'react-redux';
import {
  AccountEmailField,
  AccountPasswordField,
} from '../components/account';

class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
      password: this.state.password,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      email: this.state.email,
      password: event.target.value,
    });
  }

  render() {
    return [
      <AccountEmailField
        key="account_email_field"
        label="Please enter your email"
        value={this.state.email}
        handleChange={this.handleEmailChange}
      />,
      <AccountPasswordField
        key="account_password_field"
        label="Please enter your password"
        value={this.state.password}
        handleChange={this.handlePasswordChange}
      />
    ];
  }
}

export const AccountContainer = connect(
  state => ({
    view: state.view.currentView,
    progress: state.ui.progress,
  })
)(Account);