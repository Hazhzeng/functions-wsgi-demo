import React from 'react';
import { connect } from 'react-redux';
import {
  AccountEmailField,
  AccountPasswordField,
  AccountActionButton,
} from '../components/account';
import {
  status as accountStatus,
  checkEmail,
  changeEmail,
  changePassword,
  login,
  register,
} from '../actions/AccountActions';

class Account extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    const email = event.target.value;
    this.props.changeEmail(email);
    this.props.checkEmail(email);
  }

  handlePasswordChange(event) {
    const password = event.target.value;
    this.props.changePassword(password);
  }

  handleSubmit() {
    const { email, password } = this.props;
    if (this.props.status === accountStatus.AWAITING_LOGIN) {
      this.props.loginAccount(email, password);
    } else {
      this.props.registerAccount(email, password);
    }
  }

  _getActionButtonLabel(status) {
    const label = {
      [accountStatus.LOGGED_OUT]: 'Awaiting email...',
      [accountStatus.AWAITING_REGISTER]: 'Register (╯°. °）╯︵ ┻━┻',
      [accountStatus.AWAITING_LOGIN]: 'Login ┬─┬ノ( º _ ºノ)',
      [accountStatus.LOGGED_IN]: 'You\'ve already logged in...',
    }
    return label[status];
  }

  _getPasswordLabel(status) {
    const label = {
      [accountStatus.LOGGED_OUT]: 'Please enter a password',
      [accountStatus.AWAITING_REGISTER]: 'Please select a new password',
      [accountStatus.AWAITING_LOGIN]: 'Please enter your password',
      [accountStatus.LOGGED_IN]: 'No password is required',
    }
    return label[status];
  }

  _isActionButtonDisabled(status) {
    const isProcessing = this.props.progress < 100;
    const disabledStatuses = [
      accountStatus.LOGGED_IN,
      accountStatus.LOGGED_OUT
    ];
    return disabledStatuses.includes(status) || isProcessing;
  }

  render() {
    return [
      <AccountEmailField
        key="account_email_field"
        label="Please enter your email"
        value={this.props.email}
        handleChange={this.handleEmailChange}
        handleFocus={this.handleEmailChange}
      />,
      <AccountPasswordField
        key="account_password_field"
        label={this._getPasswordLabel(this.props.status)}
        value={this.props.password}
        handleChange={this.handlePasswordChange}
      />,
      <AccountActionButton
        key="account_action_button"
        value={this._getActionButtonLabel(this.props.status)}
        isDisabled={this._isActionButtonDisabled(this.props.status)}
        handleClick={this.handleSubmit}
      />
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
    loginAccount: (email, password) => dispatch(login(email, password)),
    registerAccount: (email, password) => dispatch(register(email, password)),
  })
)(Account);