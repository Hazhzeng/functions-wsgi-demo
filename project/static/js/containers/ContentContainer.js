import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { initialise } from '../actions/BlogActions';
import {
  titleSelector,
  tagSelector,
  textSelector,
} from '../selectors/BlogSelector';

import Preview from '../components/Contents/Preview';
import Editor from '../components/Contents/Editor';
import { isPhoneSelector } from '../selectors/DeviceSelector';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

class ContentContainer extends Component {
  constructor(props) {
    super(props);
    props.createBlog();
  }

  _renderLeftPanel() {
    const props = _.omit(this.props, ['classes']);
    return <Editor {...props} />;
  }

  _renderRightPanel() {
    const props = _.omit(this.props, ['classes']);
    return <Preview {...props} />;
  }

  render() {
    const { classes } = this.props;
    const editorPanel = this._renderLeftPanel();
    const previewPanel = this.props.isPhone
      ? <pre>Editing on phone, preview disabled.</pre>
      : this._renderRightPanel();

    return (
      <Grid container spacing={24}>
        <Grid item sm={12} lg={6}>
          <Paper className={classes.paper}>
            {editorPanel}
          </Paper>
        </Grid>
        <Grid item sm={12} lg={6}>
          <Paper className={classes.paper}>
            {previewPanel}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isPhone: isPhoneSelector(),
  blogTag: tagSelector(state),
  blogTitle: titleSelector(state),
  blogText: textSelector(state),
});

const mapDispatchToProps = dispatch => ({
  createBlog: () => dispatch(initialise()),
});

const ContentRedux =
  connect(mapStateToProps, mapDispatchToProps)(ContentContainer);

export default withStyles(styles)(ContentRedux);
