import * as React from 'react';
import {
  IAppBarItemBaseProps,
  AppBarItemBase,
  EAppBarItemShowLabel,
} from './AppBarItemBase';
import {
  AccountCircleOutlined,
  CalendarTodayOutlined,
  EditOutlined,
} from '@material-ui/icons';

export class AccountAppBarItem extends AppBarItemBase {
  constructor(props: IAppBarItemBaseProps = {
    label: 'Account',
    showLabelWhen: EAppBarItemShowLabel.never,
  }) {
    super(props);
  }

  renderIcon() {
    return <AccountCircleOutlined />;
  }
};

export class BlogAppBarItem extends AppBarItemBase {
  constructor(props: IAppBarItemBaseProps = {
    label: 'Blog',
    showLabelWhen: EAppBarItemShowLabel.never,
  }) {
    super(props);
  }

  renderIcon() {
    return <CalendarTodayOutlined />;
  }
};

export class EditAppBarItem extends AppBarItemBase {
  constructor(props: IAppBarItemBaseProps = {
    label: 'Edit',
    showLabelWhen: EAppBarItemShowLabel.never,
  }) {
    super(props);
  }

  renderIcon() {
    return <EditOutlined />;
  }
};