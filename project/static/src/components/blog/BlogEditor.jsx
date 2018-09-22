import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { withStyles } from '@material-ui/core/styles';

import 'brace/mode/markdown';
import 'brace/theme/github';

class BlogEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    const viewport_width = window.context.viewport_width;
    const viewport_height = window.context.viewport_height;

    this.config = {
      height: viewport_height,
      width:
        viewport_width > 1280 ?
        Math.floor((window.context.viewport_width - 200) / 2) :
        viewport_width,
    }
  }

  _renderTitleEditor() {
    return (
      <TextField
        label="Title"
        value={this.props.title}
        onChange={this.props.handleChangeTitle}
        className={this.props.classes.text}
        margin="normal"
        fullWidth
      />
    );
  }

  _renderTagEditor() {
    return (
      <TextField
        label="Tags"
        value={this.props.tag}
        onChange={this.handleChangeTag}
        className={this.props.classes.text}
        margin="normal"
        fullWidth
      />
    );
  }

  _renderAceEditor() {
    const fontSize = 16;
    const minLines = Math.floor((this.config.height - 400) / fontSize);
    const maxLines = 400;
    return (
      <AceEditor
        mode="markdown"
        theme="github"
        name="ace-editor"
        minLines={minLines}
        maxLines={maxLines}
        width={`${this.config.width}px`}
        height={`${this.config.height}px`}
        fontSize={fontSize}
        editorProps={{ $blockScrolling: true }}
        value={this.props.text}
        onChange={this.props.handleChangeText}
        showGutter={true}
        showPrintMargin={false}
        wrapEnabled
        className={this.props.classes.editor}
      />
    );
  }

  render() {
    return (
      <Grid item xs={12} lg={6} className={this.props.classes.grid}>
        {this._renderTitleEditor()}
        {this._renderTagEditor()}
        {this._renderAceEditor()}
      </Grid>
    );
  }
}

BlogEditor.propType = {
  title: PropTypes.string,
  tag: PropTypes.string,
  text: PropTypes.string,
  handleChangeTitle: PropTypes.func,
  handleChangeTag: PropTypes.func,
  handleChangeText: PropTypes.func,
}

const styles = (theme) => ({
  editor: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  text: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  grid: {
    marginTop: theme.spacing.unit * 5,
  }
});

export const BlogEditorWithStyle = withStyles(styles)(BlogEditor);