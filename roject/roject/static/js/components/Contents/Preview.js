import React from 'react';
import MarkdownIt from 'markdown-it';

class Preview extends React.Component {
  _renderMarkdown() {
    const { text } = this.props;
    const mdi = new MarkdownIt();
    const context = mdi.render(text);
    return {
      __html: `${context}`,
    }
  }

  render() {
    return <div dangerouslySetInnerHTML={this._renderMarkdown()} />;
  }

}

export default Preview;
