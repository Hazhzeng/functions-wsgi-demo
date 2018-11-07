import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { BlogPreviewList } from '../components/blog';
import { getAllBlogs, deleteBlog, editBlog } from '../actions/BlogActions';

class Blog extends React.PureComponent {
  componentDidMount() {
    this.props.getAllBlogs();
  }

  render() {
    return (
      <BlogPreviewList
        blogs={this.props.blogs}
        userId={this.props.userId}
        handleDeleteBlog={this.props.deleteBlog}
        handleEditBlog={this.props.editBlog}
      />
    );
  }
}

export const BlogContainer = connect(
  state => ({
    view: state.view.currentView,
    mutex: state.ui.loadingMutex,
    blogs: Object.values(state.blog.blogById).sort((a, b) => {
      const aDate = new Date(a.updateDate);
      const bDate = new Date(b.updateDate);
      return bDate.getTime() - aDate.getTime();
    }),
    userId: (_.head(Object.values(state.account.loggedInUserById)) || {}).id
  }),
  dispatch => ({
    getAllBlogs: () => dispatch(getAllBlogs()),
    deleteBlog: id => dispatch(deleteBlog(id)),
    editBlog: id => dispatch(editBlog(id)),
  })
)(Blog);