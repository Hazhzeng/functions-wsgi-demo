import React from 'react';
import PropTypes from 'prop-types';
import { BlogPreviewWithStyle as BlogPreview } from './BlogPreview';

export class BlogPreviewList extends React.PureComponent {
  render() {
    const { userId, handleDeleteBlog } = this.props;
    return this.props.blogs.map(blog => (
      <BlogPreview
        key={blog.id}
        id={blog.id}
        title={blog.title}
        tags={blog.tags}
        time={blog.updateDate}
        text={blog.text}
        handleDelete={blog.authorId === userId ? handleDeleteBlog : null}
      />
    ));
  }
}

BlogPreviewList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.number,
  handleDeleteBlog: PropTypes.func,
};