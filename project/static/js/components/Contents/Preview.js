import React from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { leadingZeros } from '../../utils/format';

class Preview extends React.Component {
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
    const { blogTitle } = this.props;
    if (!blogTitle) return null;

    const t = new Date();
    const year = t.getFullYear();
    const month = leadingZeros(t.getMonth() + 1, 2);
    const day = leadingZeros(t.getDate(), 2);
    const hour = leadingZeros(t.getHours(), 2);
    const minute = leadingZeros(t.getMinutes(), 2);
    const second = leadingZeros(t.getSeconds(), 2);

    return (
      <div>
        <h3>{blogTitle}</h3>
        <pre>{year}-{month}-{day} {hour}:{minute}:{second}</pre>
      </div>
    );
  }

  _renderMarkdown() {
    const { blogText } = this.props;
    const context = this.mdi.render(blogText);
    const result = {__html: `${context}`};
    return <div dangerouslySetInnerHTML={result} />;
  }

  render() {
    return (
      <div>
        {this._renderTitle()}
        {this._renderMarkdown()}
      </div>
    );
  }
}

export default Preview;
