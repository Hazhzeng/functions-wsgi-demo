import React from 'react';
import MarkdownIt from 'markdown-it';

const renderMarkdown = text => {
  const mdi = new MarkdownIt();
  const context = mdi.render(text);
  return {
    __html: `${context}`,
  }
};

const Preview = () => {
  return (
    <div dangerouslySetInnerHTML={renderMarkdown()} />
  )
};

export default Preview;
