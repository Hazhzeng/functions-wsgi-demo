import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { ExitToAppOutlined } from '@material-ui/icons';
import { status, logout } from '../../actions/AccountActions';

class AppBarItemLogout extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
  }

  renderIcon() {
    return <ExitToAppOutlined />;
  }

  render() {
    if (this.props.status !== status.LOGGED_IN) {
      return null;
    }

    return (
      <IconButton
        color='inherit'
        aria-label={this.props.label}
        onClick={this.handleClick}
      >
        {this.renderIcon()}
      </IconButton>
    );
  }
}

export default connect(
  state => ({
    status: state.account.status,
  }),
  dispatch => ({
    logout: () => dispatch(logout()),
  })
)(AppBarItemLogout);