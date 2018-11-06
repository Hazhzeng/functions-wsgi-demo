import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import hljs from 'highlight.js';
import MarkdownItLatex from 'markdown-it-latex';

import 'highlight.js/styles/atom-one-light.css';
import 'markdown-it-latex/dist/index.css';

import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { formatDate } from '../../utils';


class BlogPreview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mdi = new MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            const result = '' +
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
            return result;
          } catch (error) {
            return `Invalid Highlight Syntax: {error}`;
          }
        }
        return '';
      }
    });
    this.mdi = this.mdi.use(MarkdownItLatex);
  }

  handleDeleteGenerator() {
    return () => this.props.handleDelete(this.props.id);
  }

  handleEditGenerator() {
    return () => this.props.handleEdit(this.props.id);
  }

  _renderTitle() {
    const { title } = this.props;
    if (!title) return null;
    return title;
  }

  _renderTags() {
    const { tags } = this.props;

    if (!tags || tags.length === 0) {
      return null;
    }

    return tags.map(tag => (
      <Chip
        key={tag}
        label={tag}
        className={this.props.classes.chip}
        color="primary"
        variant="outlined"
      />
    ));
  }

  _renderTime() {
    const { time } = this.props;
    if (!time) {
      return null;
    }

    return formatDate(time, 'MMMM Do YYYY, HH:mm:ss');
  }

  _renderMarkdown() {
    const { text } = this.props;
    const context = this.mdi.render(text);
    const result = {__html: `${context}`};
    return <div dangerouslySetInnerHTML={result} />;
  }

  _renderControlPanel() {
    return [
      this.props.handleEdit && (
        <Button
          key='handle_edit_button'
          className={this.props.classes.button}
          onClick={this.handleEditGenerator()}
        >
          <EditIcon />
        </Button>
      ),
      this.props.handleDelete && (
        <Button
          key='handle_delete_button'
          className={this.props.classes.button}
          onClick={this.handleDeleteGenerator()}
        >
          <DeleteIcon />
        </Button>
      ),
    ]
  }

  render() {
    return (
      <Grid item xs={12} lg={6} zeroMinWidth>
        <Paper className={this.props.classes.paper}>
          <Typography variant='title' component='h3'>
            {this._renderTitle()}
          </Typography>
          <Typography variant='subheading' component='pre'>
            {this._renderTime()}
          </Typography>
          <Typography variant='body1' component='div'>
            {this._renderMarkdown()}
          </Typography>
          <Typography variant='body2' component='div' align='right'>
            {this._renderTags()}
            {this._renderControlPanel()}
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

BlogPreview.propType = {
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  time: PropTypes.string,
  text: PropTypes.string,

  id: PropTypes.id,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
}

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  button: {
    margin: theme.spacing.unit / 2,
  }
});

export const BlogPreviewWithStyle = withStyles(styles)(BlogPreview);