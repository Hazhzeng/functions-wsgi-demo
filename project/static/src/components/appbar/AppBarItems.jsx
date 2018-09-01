import React from 'react';
import AppBarItemBase from './AppBarItemBase';
import {
  AccountCircleOutlined,
  CalendarTodayOutlined,
  EditOutlined,
} from '@material-ui/icons';

export class AccountAppBarItem extends AppBarItemBase {
  constructor(props = {
    label: 'Account',
    showLabelWhen: 'never',
  }) {
    super(props);
  }

  renderIcon() {
    return <AccountCircleOutlined />;
  }
}

export class BlogAppBarItem extends AppBarItemBase {
  constructor(props = {
    label: 'Blog',
    showLabelWhen: 'never',
  }) {
    super(props);
  }

  renderIcon() {
    return <CalendarTodayOutlined />;
  }
}

export class EditAppBarItem extends AppBarItemBase {
  constructor(props = {
    label: 'Edit',
    showLabelWhen: 'never',
  }) {
    super(props);
  }

  renderIcon() {
    return <EditOutlined />;
  }
}