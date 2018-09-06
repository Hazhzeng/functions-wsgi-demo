import React from 'react';
import PropTypes from 'prop-types';
import { BlogPreviewWithStyle } from './BlogPreview';

export class BlogList extends React.PureComponent {
  render() {
    const { blogs } = this.props;
    blogs.map(blog => {
      <BlogPreviewWithStyle key={blog.id}
        title={blog.title}
        tags={blog.tags}
        text={blog.text}
      />
    })
  }
}

BlogList.propType = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      time: PropTypes.string,
      text: PropTypes.string,
    })
  )
}