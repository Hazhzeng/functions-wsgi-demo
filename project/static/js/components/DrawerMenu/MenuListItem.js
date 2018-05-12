import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import HomeIcon from 'material-ui-icons/Home';
import InfoIcon from 'material-ui-icons/InfoOutline';
import PostIcon from 'material-ui-icons/InsertDriveFile';
import LoginIcon from 'material-ui-icons/Input';

const MenuListItemMap = {
  home: { label: "Home", icon: <HomeIcon /> },
  info: { label: "Information", icon: <InfoIcon /> },
  post: { label: "Compose", icon: <PostIcon /> },
  login: { label: "Login & Register", icon: <LoginIcon /> },
};

const MenuListItem = ({ name }) => {
  const item = MenuListItemMap[name];

  return (
    <Link to={name}>
      <ListItem button>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItem>
    </Link>
  )
};

export default MenuListItem;
