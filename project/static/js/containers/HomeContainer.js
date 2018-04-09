import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { pullBlog } from '../actions/HomeActions';
import { blogsSelector } from '../selectors/HomeSelector';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
  }
});

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    props.pullBlog();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        Home
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: blogsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullBlog: () => dispatch(pullBlog()),
});

const HomeRedux =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export default withStyles(styles)(HomeRedux);
