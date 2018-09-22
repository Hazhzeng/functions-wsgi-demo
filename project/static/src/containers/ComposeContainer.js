import React from 'react';
import { connect } from 'react-redux';
import { BlogEditor, BlogPreview } from '../components/blog';
import {
  submitBlog,
  changeBlogTitle,
  changeBlogTag,
  changeBlogText,
} from '../actions/BlogActions';

class Compose extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.props.changeTitle(event.target.value);
  }

  handleChangeTag(event) {
    this.props.changeTag(event.target.value);
  }

  handleChangeText(value) {
    this.props.changeText(value);
  }

  handleSubmit() {
    this.props.submitBlog(null);
  }

  render() {
    return [
      <BlogEditor
        key="blog_editor"
        title={this.props.blogTitle}
        tag={this.props.blogTag}
        text={this.props.blogText}
        handleSubmit={this.handleSubmit}
        handleChangeTitle={this.handleChangeTitle}
        handleChangeTag={this.handleChangeTag}
        handleChangeText={this.handleChangeText}
      />,
      <BlogPreview
        key="blog_preview"
        title={this.props.blogTitle}
        tags={[this.props.blogTag]}
        text={this.props.blogText}
      />
    ];
  }
}

export const ComposeContainer = connect(
  state => ({
    progress: state.ui.progress,
    blogTitle: (state.blog.draftById[null] || {} ).title || '',
    blogTag: (state.blog.draftById[null] || {}).tag || '',
    blogText: (state.blog.draftById[null] || {}).text || '',
  }),
  dispatch => ({
    submitBlog: id => dispatch(submitBlog(id)),
    changeTitle: title => dispatch(changeBlogTitle(title)),
    changeTag: tag => dispatch(changeBlogTag(tag)),
    changeText: text => dispatch(changeBlogText(text)),
  })
)(Compose);