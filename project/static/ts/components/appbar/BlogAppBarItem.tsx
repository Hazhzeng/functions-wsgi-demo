import * as React from 'react';
import {
  IAppBarItemBaseProps,
  AppBarItemBase,
  EAppBarItemShowLabel,
} from './AppBarItemBase';
import { AccessAlarms } from '@material-ui/icons';

export class BlogAppBarItem extends AppBarItemBase {
  constructor(props: IAppBarItemBaseProps = {
    label: 'Blog',
    showLabelWhen: EAppBarItemShowLabel.never,
  }) {
    super(props);
  }

  renderIcon() {
    return <AccessAlarms />;
  }
};