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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    return undefined;
  }

  _renderTitleEditor() {
    return (
      <TextField
        label="Title"
        className={this.props.classes.text}
        margin="normal"
        onChange={this.handleChange}
      />
    );
  }

  _renderTagEditor() {
    return (
      <TextField
        label="Tags"
        className={this.props.classes.text}
        margin="normal"
        onChange={this.handleChange}
      />
    );
  }

  _renderAceEditor() {
    return (
      <AceEditor
        mode="markdown"
        theme="github"
        name="ace-editor"
        minLines={20}
        maxLines={80}
        width={"900px"}
        height={"1080px"}
        editorProps={{ $blockScrolling: true }}
        onChange={this.handleChange}
        showGutter={true}
        showPrintMargin={false}
        wrapEnabled
      />
    );
  }

  render() {
    return (
      <Grid item sm={10} lg={6}>
        {this._renderTitleEditor()}
        {this._renderTagEditor()}
        {this._renderAceEditor()}
      </Grid>
    );
  }
}

BlogEditor.propType = {
  classes: PropTypes.object.isRequired,
}

const styles = (theme) => ({
  text: {
    margin: theme.spacing.unit,
    width: 900,
  }
});

export const BlogEditorWithStyle = withStyles(styles)(BlogEditor);