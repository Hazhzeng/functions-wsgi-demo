import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
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

    this.handleDeleteTagGenerator = this.handleDeleteTagGenerator.bind(this);
  }

  handleDeleteTagGenerator(tag) {
    return () => this.props.handleDeleteTag(tag);
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

  _renderTagChips() {
    if (!this.props.tags || this.props.tags.length === 0) {
      return null;
    }

    return this.props.tags.map(tag => (
      <Chip
        key={tag}
        label={tag}
        clickable
        className={this.props.classes.chip}
        onDelete={this.handleDeleteTagGenerator(tag)}
        color="primary"
        variant="outlined"
      />
    ));
  }

  _renderTagEditor() {
    return (
      <FormControl className={this.props.classes.tag}>
        <InputLabel htmlFor="adornment-tag-input">Tag</InputLabel>
        <Input
          id="adornment-tag-input"
          value={this.props.tag}
          onChange={this.props.handleChangeTag}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={this.props.handleCommitTag}>
                <PlaylistAdd />
              </IconButton>
              {this._renderTagChips()}
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }

  _renderEditorControlPanel() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          className={this.props.classes.button}
          onClick={this.props.handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </div>
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
        {this._renderEditorControlPanel()}
      </Grid>
    );
  }
}

BlogEditor.propType = {
  title: PropTypes.string,
  tag: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChangeTitle: PropTypes.func,
  handleChangeTag: PropTypes.func,
  handleDeleteTag: PropTypes.func,
  handleChangeText: PropTypes.func,
  handleCommitTag: PropTypes.func,
}

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  editor: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  tag: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  text: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  grid: {
    marginTop: theme.spacing.unit * 5,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  }
});

export const BlogEditorWithStyle = withStyles(styles)(BlogEditor);