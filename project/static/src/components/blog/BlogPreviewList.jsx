import React from 'react';
import Grid from '@material-ui/core/Grid';
import { BlogPreviewWithStyle as BlogPreview } from './BlogPreview';

export class BlogPreviewList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.config = {
      renderType: window.innerWidth < 1280 ? 'small' : 'large',
    }
  }

  renderWithSingleColumn() {
    return this.props.blogs.map(blog => (
      <BlogPreview
        key={blog.id}
        title={blog.title}
        tags={blog.tags}
        time={blog.updateDate}
        text={blog.text}
      />
    ));
  }

  renderWithDoubleColumn() {
    return this.renderWithSingleColumn();
  }

  render() {
    if (this.config.renderType === 'small') {
      return this.renderWithSingleColumn();
    } else if (this.config.rednerType === 'large') {
      return this.renderWithDoubleColumn();
    }
    return null;
  }
}