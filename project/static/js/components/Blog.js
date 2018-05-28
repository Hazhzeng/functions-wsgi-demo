import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItLatex from 'markdown-it-latex';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { leadingZeros } from '../utils/format';
import TagList from './TagList';

import 'markdown-it-latex/dist/index.css';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.mdi = new MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            const result = '<pre class="hljs"><code>' +
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
    return <h3>{title}</h3>;
  }

  _renderTags() {
    const { tags } = this.props;
    if (!tags) return null;
    return <TagList tags={tags} readOnly />
  }

  _renderTime() {
    const { time } = this.props;
    if (!time) return null;

    const t = new Date(time);

    const year = t.getFullYear();
    const month = leadingZeros(t.getMonth() + 1, 2);
    const day = leadingZeros(t.getDate(), 2);
    const hour = leadingZeros(t.getHours(), 2);
    const minute = leadingZeros(t.getMinutes(), 2);
    const second = leadingZeros(t.getSeconds(), 2);

    return <pre>{year}-{month}-{day} {hour}:{minute}:{second}</pre>;
  }

  _renderMarkdown() {
    const { text } = this.props;
    const context = this.mdi.render(text);
    const result = {__html: `${context}`};
    return <div dangerouslySetInnerHTML={result} />;
  }

  render() {
    return (
      <div>
        {this._renderTitle()}
        {this._renderTime()}
        {this._renderMarkdown()}
        {this._renderTags()}
      </div>
    );
  }
}

export default Blog;
