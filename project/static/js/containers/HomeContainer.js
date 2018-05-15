import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField  from '@material-ui/core/TextField';
import Grid  from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { pullBlog } from '../actions/HomeActions';
import { blogsSelector, uiSelector } from '../selectors/HomeSelector';

import Blog from '../components/Contents/Blog';
import { dateToString } from '../utils/format';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  hr: {
    clear: 'both',
    visibility: 'hidden',
  }
});

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    const t = new Date();
    this.state = {
      isDateValid: true,
      date: `${dateToString(t)}`,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.pullSubmit = _.debounce(this.pullSubmit, 1000);

    /* API call to fetch blog */
    props.pull(this.state.date);
  }

  onDateChange(event) {
    const isValid = Boolean(Date.parse(event.target.value));
    this.setState({
      date: event.target.value,
      isDateValid: isValid,
    });

    if (isValid) {
      this.pullSubmit();
    }
  }

  pullSubmit() {
    this.props.pull(this.state.date);
  }

  _renderMemoryPicker() {
    const { classes, loading } = this.props;
    return (
      <Grid item sm={12} lg={12} key={'blog.today'}>
        <TextField
          id="date"
          type="date"
          value={this.state.date}
          onChange={this.onDateChange}
          className={classes.textField}
          InputLabelProps={{shrink: true}}
          disabled={loading}
          error={!this.state.isDateValid}
        />
      </Grid>
    );
  }

  _renderBlog(blog) {
    const { classes } = this.props;
    return (
      <div key={blog.last_update}>
        <Paper className={classes.paper}>
          <Blog title={blog.title} time={blog.last_update} text={blog.text} />
        </Paper>
        <hr className={classes.hr} />
      </div>
    );
  }

  dpRenderBlogs(remains, pickedLeft, pickedRight, heightLeft, heightRight) {
    if (remains.length == 0) {
      return ({
        left: heightLeft,
        right: heightRight,
        leftBlogs: pickedLeft,
        rightBlogs: pickedRight
      });
    }

    const blog = remains[0];
    const blogHeight = blog.text.split(/\r\n|\r|\n/).length;

    const pickLeft = this.dpRenderBlogs(
      remains.slice(1),
      [...pickedLeft, blog],
      [...pickedRight],
      heightLeft + blogHeight,
      heightRight
    );

    const pickRight = this.dpRenderBlogs(
      remains.slice(1),
      [...pickedLeft],
      [...pickedRight, blog],
      heightLeft,
      heightRight + blogHeight
    );

    const pickLeftDiff = Math.abs(pickLeft.left - pickLeft.right);
    const pickRightDiff = Math.abs(pickRight.left - pickRight.right);

    if (pickLeftDiff < pickRightDiff) {
      return pickLeft;
    } else {
      return pickRight;
    }
  }

  blogComparator(a, b) {
    return Date.parse(b.last_update) - Date.parse(a.last_update);
  }

  render() {
    const { blogs } = this.props;
    let result = { leftBlogs: [], rightBlogs: []};
    if (blogs && blogs.length > 0) {
      result = this.dpRenderBlogs(blogs, [], [], 0, 0);
    }

    return (
      <Grid container spacing={24} direction="row">
        {this._renderMemoryPicker()}
        <Grid item sm={12} lg={6} key="left-blog-section">
          {result.rightBlogs
            .sort(this.blogComparator)
            .map(blog => this._renderBlog(blog))}
        </Grid>
        <Grid item sm={12} lg={6} key="right-blog-section">
          {result.leftBlogs
            .sort(this.blogComparator)
            .map(blog => this._renderBlog(blog))}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: blogsSelector(state),
  loading: uiSelector(state).loading,
});

const mapDispatchToProps = (dispatch) => ({
  pull: date => dispatch(pullBlog(date)),
});

const HomeRedux =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export default withStyles(styles)(HomeRedux);
