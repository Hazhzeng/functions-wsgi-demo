import * as React from 'react';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';

import { BlogAppBarItem } from './BlogAppBarItem';

export interface IApplicationBarProps {
  title: string,
};

interface IApplicationBar extends IApplicationBarProps, WithStyles<typeof styles> {}

class ApplicationBar extends React.PureComponent<IApplicationBar> {
  _renderTitle() {
    return (
      <Typography
        variant='title'
        color='inherit'
        className={this.props.classes.flex}
      >
        {this.props.title}
      </Typography>
    );
  }

  _renderAppBarItems() {
    return <BlogAppBarItem />;
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position='static'>
          <Toolbar>
            {this._renderTitle()}
            {this._renderAppBarItems()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
});

export const ApplicationBarWithStyle =
  withRoot(withStyles(styles)(ApplicationBar));