import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteBlog } from '../../actions/BlogActions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class BlogControl extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.delete(this.props.blogId)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton className={classes.button} onClick={this.handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  delete: (id) => dispatch(deleteBlog(id))
});

const BlogControlRedux = connect(null, mapDispatchToProps)(BlogControl);

export default withStyles(styles)(BlogControlRedux);