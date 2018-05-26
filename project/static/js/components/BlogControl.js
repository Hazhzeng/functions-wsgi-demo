import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/ModeEdit';

import {
  changeTitle,
  changeTag,
  changeText,
  deleteBlog,
  setAdmentment,
} from '../actions/BlogActions';
import { isPhoneSelector } from '../selectors/DeviceSelector';
import { blogSelector } from '../selectors/HomeSelector';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 0.5,
  },
});

class BlogControl extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.delete(this.props.blogId);
  }

  handleEdit(event) {
    event.preventDefault();
    const blog = this.props.blogSelect(this.props.blogId);
    this.props.edit(blog.id);
    this.props.editTitle(blog.title);
    this.props.editTag(blog.tags.join(' '));
    this.props.editText(blog.text);
  }

  render() {
    const { classes, isMobile } = this.props;
    const editButton = isMobile ? null : (
      <IconButton className={classes.button} onClick={this.handleEdit}>
        <EditIcon />
      </IconButton>
    );
    const removeButton = (
      <IconButton className={classes.button} onClick={this.handleDelete}>
        <DeleteIcon />
      </IconButton>
    );
    
    return (
      <div style={{ textAlign: 'right' }}>
        {editButton}
        {removeButton}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blogSelect: (id) => blogSelector(id)(state),
  isMobile: isPhoneSelector(),
});

const mapDispatchToProps = dispatch => ({
  delete: (id) => dispatch(deleteBlog(id)),
  edit: (id) => dispatch(setAdmentment(id)),
  editTitle: (title) => dispatch(changeTitle(title)),
  editTag: (tag) => dispatch(changeTag(tag)),
  editText: (text) => dispatch(changeText(text)),
});

const BlogControlRedux =
  connect(mapStateToProps, mapDispatchToProps)(BlogControl);

export default withStyles(styles)(BlogControlRedux);