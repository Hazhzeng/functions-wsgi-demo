import React from 'react';
import { BlogPreviewWithStyle as BlogPreview } from './BlogPreview';

export class BlogPreviewList extends React.PureComponent {
  render() {
    return this.props.blogs.map(blog => (
      <BlogPreview
        key={blog.id}
        title={blog.title}
        tags={['1', '2', '3']}
        time={blog.updateDate}
        text={blog.text}
      />
    ));
  }
}