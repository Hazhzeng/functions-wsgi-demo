import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {
  changeTitle,
  changeTag,
  changeText,
  submitBlog,
} from '../../actions/BlogActions';

import {
  titleSelector,
  tagSelector,
  textSelector,
  isSubmittableSelector,
} from '../../selectors/BlogSelector';

const styles = theme => ({
  aceEditor: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  }
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.config = {
      minLines: 23,
      maxLines: 999,
      autoWrap: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitBlog();
  }

  _renderTitle() {
    const { blogTitle, handleChangeTitle } = this.props;
    return (
      <Grid item sm={12} lg={12} key={'editor.title'}>
        <TextField
          label="title"
          margin="normal"
          value={blogTitle}
          onChange={(event) => handleChangeTitle(event.target.value)}
          fullWidth
        />
      </Grid>
    );
  }

  _renderTag() {
    const { blogTag, handleChangeTag } = this.props;
    return (
      <Grid item sm={12} lg={12} key={'editor.tag'}>
        <TextField
          label="tag"
          margin="normal"
          value={blogTag}
          onChange={(event) => handleChangeTag(event.target.value)}
          fullWidth
        />
      </Grid>
    );
  }

  _renderAceEditor() {
    const { classes, blogText, handleChangeText } = this.props;

    return (
      <Grid item sm={12} lg={12} key={'editor.ace'}>
        <AceEditor
          mode="markdown"
          theme="github"
          name="ace-editor"
          minLines={this.config.minLines}
          maxLines={this.config.maxLines}
          wrapEnabled={this.config.autoWrap}
          className={classes.aceEditor}
          onChange={handleChangeText}
          editorProps={{$blockScrolling: true}}
          value={blogText}
        />
      </Grid>
    );
  }

  render() {
    return (
      <Grid container
        direction="column"
        alignItems="center"
        spacing={24}
      >
        <form>
          {this._renderTitle()}
          {this._renderTag()}
          {this._renderAceEditor()}
          <Button
            color="primary"
            onClick={this.handleSubmit}
            onSubmit={this.handleSubmit}
            type="submit"
            disabled={!this.props.isSubmittable}
            fullWidth
          >
          Submit
          </Button>
        </form>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  blogTag: tagSelector(state),
  blogTitle: titleSelector(state),
  blogText: textSelector(state),
  isSubmittable: isSubmittableSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeTitle: (title) => dispatch(changeTitle(title)),
  handleChangeTag: (tag) => dispatch(changeTag(tag)),
  handleChangeText: (text) => dispatch(changeText(text)),
  submitBlog: () => dispatch(submitBlog()),
});

const EditorRedux =
  connect(mapStateToProps, mapDispatchToProps)(Editor);

export default withStyles(styles)(EditorRedux);
