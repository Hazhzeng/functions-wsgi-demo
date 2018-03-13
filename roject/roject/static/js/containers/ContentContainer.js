import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class ContentContainer extends Component {
  render() {
    const { classes, content } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography noWrap>{content}</Typography>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  content: 'left left right right',
});

const ContentRedux = connect(mapStateToProps)(ContentContainer);

export default withStyles(styles)(ContentRedux);
