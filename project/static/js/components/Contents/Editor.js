import React from 'react';
import {
  Editor as DraftEditor,
  EditorState as DraftEditorState
} from 'draft-js';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: "80%",
  }
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: DraftEditorState.createEmpty(),
    };

    this.onDraftChange = this.onDraftChange.bind(this);
  }

  onDraftChange(editorState) {
    this.setState({
      ...this.state,
      editorState: editorState,
    });
  }

  _renderTitle() {
    const { classes, blogTitle, handleChangeTitle } = this.props;
    return (
      <TextField
        label="title"
        className={classes.textField}
        margin="normal"
        value={blogTitle}
        onChange={(event) => handleChangeTitle(event.target.value)}
        fullWidth
      />
    );
  }

  _renderTag() {
    const { classes, blogTag, handleChangeTag } = this.props;
    return (
      <TextField
        label="tag"
        className={classes.textField}
        margin="normal"
        value={blogTag}
        onChange={(event) => handleChangeTag(event.target.value)}
        fullWidth
      />
    );
  }

  _renderText() {
    const { classes, blogText, handleChangeText } = this.props;
    return (
      <TextField
        label="text"
        className={classes.textField}
        margin="normal"
        rows={20}
        rowsMax={20}
        value={blogText}
        onChange={(event) => handleChangeText(event.target.value)}
        fullWidth
        multiline
      />
    );
  }

  _renderDraftText() {
    return (
      <DraftEditor
        editorState={this.state.editorState}
        onChange={this.onDraftChange}
        placeholder='>'
      />
    );
  }

  render() {
    const { submitBlog } = this.props;
    return (
      <div>
        <form>
          {this._renderTitle()}
          {this._renderTag()}
          {this._renderDraftText()}
          <Button
            color="primary"
            onClick={submitBlog}
            fullWidth
          >
          Submit
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(Editor);
