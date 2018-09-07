import React from 'react';
import { connect } from 'react-redux';
import { BlogPreviewList } from '../components/blog';

class Blog extends React.PureComponent {
  componentDidMount() {
    
  }

  render() {
    return (
      <BlogPreviewList />
    );
  }
}

export const BlogContainer = connect(
  state => ({
    view: state.view.currentView,
    progress: state.ui.progress,
  })
)(Blog);