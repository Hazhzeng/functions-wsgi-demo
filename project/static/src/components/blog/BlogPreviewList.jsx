import React from 'react';
import { BlogPreviewWithStyle as BlogPreview } from './BlogPreview';

export class BlogPreviewList extends React.PureComponent {
  render() {
    return this.props.blogs.map(blog => (
      <BlogPreview
        key={blog.id}
        title={blog.title}
        time={blog.updateDate}
        text={blog.text}
      />
    ));
  }
}