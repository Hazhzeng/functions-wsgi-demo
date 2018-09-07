import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoadingIndicator from './LoadingIndicator';

import AccountButton from './AppBarItemAccount';
import BlogButton from './AppBarItemBlog';
import EditButton from './AppBarItemEdit';

class ApplicationBar extends React.PureComponent {
  _renderProgressBar(progress) {
    return <LoadingIndicator progressNumber={progress} />
  }

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
    return (
      <div>
        <BlogButton view={this.props.view} />
        <EditButton view={this.props.view} />
        <AccountButton view={this.props.view} />
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position={'fixed'}>
          <Toolbar>
            {this._renderProgressBar(50)}
            {this._renderTitle()}
            {this._renderAppBarItems()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ApplicationBar.propTypes = {
  title: PropTypes.string,
  view: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 3,
  },
  flex: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3,
  },
});

export const ApplicationBarWithStyle = withStyles(styles)(ApplicationBar);