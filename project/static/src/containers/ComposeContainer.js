import React from 'react';
import { connect } from 'react-redux';
import { BlogEditor, BlogPreview } from '../components/blog';
import {
  submitBlog,
  changeBlogTitle,
  changeBlogTag,
  changeBlogText,
  commitBlogTag,
  deleteBlogTag,
} from '../actions/BlogActions';

class Compose extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommitTag = this.handleCommitTag.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
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

  handleCommitTag() {
    this.props.commitTag(null);
  }

  handleDeleteTag(value) {
    this.props.deleteTag(null, value);
  }

  render() {
    return [
      <BlogEditor
        key="blog_editor"
        title={this.props.blogTitle}
        tag={this.props.blogTag}
        tags={this.props.blogTags}
        text={this.props.blogText}
        handleSubmit={this.handleSubmit}
        handleChangeTitle={this.handleChangeTitle}
        handleChangeTag={this.handleChangeTag}
        handleChangeText={this.handleChangeText}
        handleCommitTag={this.handleCommitTag}
        handleDeleteTag={this.handleDeleteTag}
      />,
      <BlogPreview
        key="blog_preview"
        title={this.props.blogTitle}
        tags={this.props.blogTags}
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
    blogTags: (state.blog.draftById[null] || {}).tags || [],
    blogText: (state.blog.draftById[null] || {}).text || '',
  }),
  dispatch => ({
    submitBlog: id => dispatch(submitBlog(id)),
    changeTitle: title => dispatch(changeBlogTitle(title)),
    changeTag: tag => dispatch(changeBlogTag(tag)),
    changeText: text => dispatch(changeBlogText(text)),
    commitTag: id => dispatch(commitBlogTag(id)),
    deleteTag: (id, tag) => dispatch(deleteBlogTag(id, tag)),
  })
)(Compose);