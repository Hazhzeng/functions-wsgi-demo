import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import hljs from 'highlight.js';
import MarkdownItLatex from 'markdown-it-latex';

import 'highlight.js/styles/atom-one-light.css';
import 'markdown-it-latex/dist/index.css';

import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

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

    const datetimeMoment = moment(time);
    if (!datetimeMoment.isValid()) {
      return null;
    }

    return datetimeMoment.format('MMMM Do YYYY, h:mm:ss a');
  }

  _renderMarkdown() {
    const { text } = this.props;
    const context = this.mdi.render(text);
    const result = {__html: `${context}`};
    return <div dangerouslySetInnerHTML={result} />;
  }

  render() {
    return (
      <Grid item xs={12} lg={6}>
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
          <Typography variant='body2' component='div'>
            {this._renderTags()}
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
  }
});

export const BlogPreviewWithStyle = withStyles(styles)(BlogPreview);