import React from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

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
  }

  _renderTitle() {
    const { title } = this.props;
    if (!title) return null;

    return <h3>{title}</h3>;
  }

  _renderTime() {
    const { time } = this.props;
    if (!time) return null;

    const t = new Date(time);

    const year = t.getFullYear();
    const month = t.getMonth();
    const day = t.getDate();
    const hour = t.getHours();
    const minute = t.getMinutes();
    const second = t.getSeconds();

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
      </div>
    );
  }
}

export default Blog;
