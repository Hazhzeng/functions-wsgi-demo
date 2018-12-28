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
  saveBlogToDraft,
  loadBlogFromDraft,
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
    this.handleBeforeunload = this.handleBeforeunload.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleBeforeunload);
    this.props.loadBlogFromDraft();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeunload);
    this.props.saveBlogToDraft();
  }

  handleBeforeunload() {
    this.props.saveBlogToDraft();
  }

  handleChangeTitle(event) {
    this.props.changeTitle(this.props.id, event.target.value);
  }

  handleChangeTag(event) {
    this.props.changeTag(this.props.id, event.target.value);
  }

  handleChangeText(value) {
    this.props.changeText(this.props.id, value);
  }

  handleSubmit() {
    this.props.submitBlog(this.props.id);
  }

  handleCommitTag() {
    this.props.commitTag(this.props.id);
  }

  handleDeleteTag(value) {
    this.props.deleteTag(this.props.id, value);
  }

  render() {
    return [
      <BlogEditor
        key="blog_editor"
        id={this.props.id}
        title={this.props.blogTitle}
        tag={this.props.blogTag}
        tags={this.props.blogTags}
        text={this.props.blogText}
        handleChangeTitle={this.handleChangeTitle}
        handleChangeTag={this.handleChangeTag}
        handleChangeText={this.handleChangeText}
        handleCommitTag={this.handleCommitTag}
        handleDeleteTag={this.handleDeleteTag}
        handleSubmit={this.handleSubmit}
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
    id: state.blog.focusId,
    blogTitle: (state.blog.draftById[state.blog.focusId] || {}).title || '',
    blogTag: (state.blog.draftById[state.blog.focusId] || {}).tag || '',
    blogTags: (state.blog.draftById[state.blog.focusId] || {}).tags || [],
    blogText: (state.blog.draftById[state.blog.focusId] || {}).text || '',
  }),
  dispatch => ({
    changeTitle: (id, title) => dispatch(changeBlogTitle(title, id)),
    changeTag: (id, tag) => dispatch(changeBlogTag(tag, id)),
    changeText: (id, text) => dispatch(changeBlogText(text, id)),
    commitTag: id => dispatch(commitBlogTag(id)),
    deleteTag: (id, tag) => dispatch(deleteBlogTag(id, tag)),
    submitBlog: id => dispatch(submitBlog(id)),
    saveBlogToDraft: () => dispatch(saveBlogToDraft()),
    loadBlogFromDraft: () => dispatch(loadBlogFromDraft()),
  })
)(Compose);