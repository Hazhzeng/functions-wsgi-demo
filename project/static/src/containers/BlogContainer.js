import React from 'react';
import { connect } from 'react-redux';
import { BlogPreviewList } from '../components/blog';
import { getAllBlogs } from '../actions/BlogActions';

class Blog extends React.PureComponent {
  componentDidMount() {
    this.props.getAllBlogs();
  }

  render() {
    return (
      <BlogPreviewList blogs={this.props.blogs} />
    );
  }
}

export const BlogContainer = connect(
  state => ({
    view: state.view.currentView,
    progress: state.ui.progress,
    blogs: Object.values(state.blog.blogById).sort((a, b) => {
      const aDate = new Date(a.updateDate);
      const bDate = new Date(b.updateDate);
      return bDate.getTime() - aDate.getTime();
    }),
  }),
  dispatch => ({
    getAllBlogs: () => dispatch(getAllBlogs())
  })
)(Blog);