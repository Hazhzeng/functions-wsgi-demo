import React from 'react';
import { connect } from 'react-redux';
import {
  AccountEmailField,
  AccountPasswordField,
} from '../components/account';
import {
  checkEmail,
  changeEmail,
  changePassword,
} from '../actions/AccountActions';

class Account extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleEmailCheck = this.handleEmailCheck.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailCheck() {
    this.props.checkEmail(this.props.email);
  }

  handleEmailChange(event) {
    this.props.changeEmail(event.target.value);
  }

  handlePasswordChange(event) {
    this.props.changePassword(event.target.value);
  }

  render() {
    return [
      <AccountEmailField
        key="account_email_field"
        label="Please enter your email"
        value={this.props.email}
        handleChange={this.handleEmailChange}
        handleBlur={this.handleEmailCheck}
      />,
      <AccountPasswordField
        key="account_password_field"
        label="Please enter your password"
        value={this.props.password}
        handleChange={this.handlePasswordChange}
      />,
      <div key="status">{this.props.status}</div>
    ];
  }
}

export const AccountContainer = connect(
  state => ({
    view: state.view.currentView,
    progress: state.ui.progress,
    email: state.account.tempEmail || '',
    password: state.account.tempPassword || '',
    status: state.account.status,
  }),
  dispatch => ({
    checkEmail: email => dispatch(checkEmail(email)),
    changeEmail: email => dispatch(changeEmail(email)),
    changePassword: password => dispatch(changePassword(password)),
  })
)(Account);