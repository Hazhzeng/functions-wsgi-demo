import * as React from 'react';
import * as MarkdownIt from 'markdown-it';
import * as moment from 'moment';
import { hljs } from 'highlight.js';
import { MarkdownItLatex } from 'markdown-it-latex';

import 'highlight.js/styles/atom-one-light.css';
import 'markdown-it-latex/dist/index.css';

export interface IBlogPreviewProps {
  title: string,
  tags: string[],
  time: string,
  text: string,
} 

export class BlogPreview extends React.PureComponent<IBlogPreviewProps> {
  private mdi = null;

  constructor(props) {
    super(props);
    this.mdi = new MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            const result = ''+
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
    return <h3>{title}</h3>;
  }

  _renderTags() {
    const { tags } = this.props;
    if (!tags) return null;
    return <h4>tags.join(' ')</h4>
  }

  _renderTime() {
    const { time } = this.props;
    const datetimeMoment = moment(time);

    if (!datetimeMoment.isValid()) {
      return null;
    }

    return <pre>{datetimeMoment.format()}</pre>;
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