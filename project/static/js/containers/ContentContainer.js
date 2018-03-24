import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { changeTitle, changeTag, changeText, submitBlog } from '../actions/BlogActions';
import Preview from '../components/Contents/Preview';
import Editor from '../components/Contents/Editor';
import { textSelector } from '../selectors/BlogSelector';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  toolbar: theme.mixins.toolbar,
});

class ContentContainer extends Component {
  _renderLeftPanel() {
    return <Editor
      handleChangeTitle={this.props.handleChangeTitle}
      handleChangeTag={this.props.handleChangeTag}
      handleChangeText={this.props.handleChangeText}
      submitBlog={this.props.submitBlog}
    />;
  }

  _renderRightPanel() {
    return <Preview
      blogText={this.props.blogText}
    />;
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={24}>
          <Grid item sm={6}>
            <Paper className={classes.paper}>
              {this._renderLeftPanel()}
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className={classes.paper}>
              {this._renderRightPanel()}
            </Paper>
          </Grid>
        </Grid>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  blogText: textSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeTitle: (title) => dispatch(changeTitle(title)),
  handleChangeTag: (tag) => dispatch(changeTag(tag)),
  handleChangeText: (text) => dispatch(changeText(text)),
  submitBlog: () => dispatch(submitBlog()),
});

const ContentRedux = connect(mapStateToProps, mapDispatchToProps)(ContentContainer);

export default withStyles(styles)(ContentRedux);
