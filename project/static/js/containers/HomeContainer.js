import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField  from '@material-ui/core/TextField';
import Grid  from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Blog from '../components/Blog';
import TagList from '../components/TagList';
import Editor from '../components/Editor';
import BlogControl from '../components/BlogControl';
import { pullBlog } from '../actions/HomeActions';
import {
  blogsSelector,
  uiSelector,
  isMenuShownSelector,
  availableTagsSelector,
} from '../selectors/HomeSelector';
import { blogIdSelector } from '../selectors/BlogSelector';
import { userIdSelector } from '../selectors/UserSelector';
import { isPhoneSelector } from '../selectors/DeviceSelector';

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

  _renderDatetimePicker() {
    const { classes, loading } = this.props;
    return (
      <Grid item xs={12} lg={12} key={'home.date_time_picker'}>
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

  _renderTagList() {
    return (
      <Grid item xs={12} lg={12} key={'home.available_tags'}>
        <TagList tags={this.props.tags}/>
      </Grid>
    );
  }

  _renderBlog(blog) {
    const { classes } = this.props;
    const blogRender = blog.id === this.props.amendingBlogId
      ? <Editor />
      :(<div>
          <Blog {...blog} />
          {blog.user === this.props.userId && <BlogControl blogId={blog.id}/>}
        </div>);
    return (
      <div key={blog.last_update}>
        <Paper className={classes.paper}>
          {blogRender}
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
        rightSection: pickedLeft,
        leftSection: pickedRight
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
    const { blogs, isPhone, isMenuShown } = this.props;
    const renderContent = [
      this._renderDatetimePicker(),
      this._renderTagList(),
    ];

    if (blogs && blogs.length > 0) {
      if (!isPhone) {
        const result = this.dpRenderBlogs(blogs, [], [], 0, 0);
        const leftSectionRender =
          result.leftSection.sort(this.blogComparator).map(b => this._renderBlog(b))
        const rightSectionRender =
          result.rightSection.sort(this.blogComparator).map(b => this._renderBlog(b))
        renderContent.push(
          <Grid item xs={12} lg={6} key="left-blog-section">
            {leftSectionRender}
          </Grid>
        );
        renderContent.push(
          <Grid item xs={12} lg={6} key="right-blog-section">
            {rightSectionRender}
          </Grid>
        );
      } else {
        const sectionRender = isMenuShown
          ? null
          : blogs.sort(this.blogComparator).map(b => this._renderBlog(b));
        renderContent.push(
          <Grid item xs={12} lg={6} key="blog-section">
            {sectionRender}
          </Grid>
        );
      }
    }

    return (
      <Grid container spacing={24} direction="row">
        {renderContent}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: userIdSelector(),
  amendingBlogId: blogIdSelector(state),
  blogs: blogsSelector(state),
  tags: availableTagsSelector(state),
  loading: uiSelector(state).loading,
  isPhone: isPhoneSelector(),
  isMenuShown: isMenuShownSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  pull: date => dispatch(pullBlog(date)),
});

const HomeRedux =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export default withStyles(styles)(HomeRedux);
