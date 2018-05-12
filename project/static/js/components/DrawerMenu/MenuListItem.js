import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import HomeIcon from 'material-ui-icons/Home';
import InfoIcon from 'material-ui-icons/InfoOutline';
import PostIcon from 'material-ui-icons/InsertDriveFile';
import LoginIcon from 'material-ui-icons/Input';
import LogoutIcon from 'material-ui-icons/Link';

const MenuListItemMap = {
  home: { label: "Home", icon: <HomeIcon />, credReq: false },
  info: { label: "Information", icon: <InfoIcon />, credReq: false },
  post: { label: "Compose", icon: <PostIcon />, credReq: true },
  login: { label: "Login & Register", icon: <LoginIcon />, credReq: false },
  logout: { label: "Logout", icon: <LogoutIcon />, credReq: true },
};

const enableItem = (name, item) => {
  return (
    <Link to={name}>
      <ListItem button>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItem>
    </Link>
  );
};

const disableItem = (name, item) => {
  return (
    <ListItem disabled>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItem>
  );
};

const MenuListItem = ({ name, isLoggedIn }) => {
  const item = MenuListItemMap[name];
  const isDisabled = item.credReq && !isLoggedIn;
  return isDisabled ? disableItem(name, item) : enableItem(name, item);
};

export default MenuListItem;
