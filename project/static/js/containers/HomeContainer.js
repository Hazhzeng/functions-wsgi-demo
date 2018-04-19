import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { pullBlog } from '../actions/HomeActions';
import { blogsSelector } from '../selectors/HomeSelector';

import Blog from '../components/Contents/Blog';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
  }
});

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    props.pull();
  }

  render() {
    const { classes, blogs } = this.props;
    const renderedBlogs = blogs.map(blog => (
      <Grid item sm={12} lg={6} key={blog.last_update}>
        <Paper className={classes.paper}>
          <Blog title={blog.title} time={blog.last_update} text={blog.text} />
        </Paper>
      </Grid>
    ));

    return (
      <Grid container spacing={24}>
        {renderedBlogs}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: blogsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  pull: () => dispatch(pullBlog()),
});

const HomeRedux =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export default withStyles(styles)(HomeRedux);
