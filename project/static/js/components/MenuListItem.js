import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/InfoOutline';
import PostIcon from '@material-ui/icons/InsertDriveFile';
import LoginIcon from '@material-ui/icons/Input';
import LogoutIcon from '@material-ui/icons/Link';

import { toggleMenu } from '../actions/HomeActions';
import { isPhoneSelector } from '../selectors/DeviceSelector';

class MenuListItem extends Component {
  constructor(props) {
    super(props);

    this.MenuListItemMap = {
      home: { label: "Home", icon: <HomeIcon />, credReq: false },
      info: { label: "Information", icon: <InfoIcon />, credReq: false },
      post: { label: "Compose", icon: <PostIcon />, credReq: true },
      login: { label: "Login & Register", icon: <LoginIcon />, credReq: false },
      logout: { label: "Logout", icon: <LogoutIcon />, credReq: true },
    };

    this._renderEnabledItem = this._renderEnabledItem.bind(this);
    this._renderDisabledItem = this._renderDisabledItem.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    if (this.props.isPhone) {
      this.props.switchMenu();
    }
  }

  _renderEnabledItem(name, item) {
    return (
      <Link to={name}>
        <ListItem button onClick={this.handleOnClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      </Link>
    );
  }

  _renderDisabledItem(name, item) {
    return (
      <ListItem disabled>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItem>
    );
  }

  render() {
    const { name, isLoggedIn } = this.props;
    const item = this.MenuListItemMap[name];
    const isDisabled = item.credReq && !isLoggedIn;
    return isDisabled
      ? this._renderDisabledItem(name, item)
      : this._renderEnabledItem(name, item);
  }
}

const mapStateToProps = () => ({
  isPhone: isPhoneSelector(),
});

const mapDispatchToProps = dispatch => ({
  switchMenu: () => dispatch(toggleMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuListItem);
