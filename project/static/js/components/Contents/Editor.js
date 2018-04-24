import React from 'react';

import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  aceEditor: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  }
});

class Editor extends React.Component {
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
          required
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
          className={classes.aceEditor}
          onChange={handleChangeText}
          editorProps={{$blockScrolling: true}}
          value={blogText}
        />
      </Grid>
    );
  }

  render() {
    const { submitBlog } = this.props;
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
            onClick={submitBlog}
            fullWidth
          >
          Submit
          </Button>
        </form>
      </Grid>
    )
  }
}

export default withStyles(styles)(Editor);
