import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { pullBlog } from '../actions/HomeActions';
import { blogsSelector } from '../selectors/HomeSelector';

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
});

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    const t = new Date();
    this.state = {
      date: `${dateToString(t)}`
    };

    this.pristine = {
      today: `${dateToString(t)}`
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.pullSubmit = _.debounce(this.pullSubmit, 1000);

    /* API call */
    props.pull(this.pristine.today);
  }

  onDateChange(event) {
    this.setState({ date: event.target.value });
    this.pullSubmit();
  }

  pullSubmit() {
    this.props.pull(this.state.date);
  }

  _renderMemoryPicker() {
    const { classes } = this.props;
    return (
      <Grid item sm={12} lg={12} key={'blog.today'}>
        <TextField
          id="date"
          type="date"
          onChange={this.onDateChange}
          defaultValue={this.pristine.today}
          className={classes.textField}
          InputLabelProps={{shrink: true}}
        />
      </Grid>
    );
  }

  _renderBlogs() {
    const { classes, blogs } = this.props;
    const renderedBlogs = blogs.map(blog => (
      <Grid item sm={12} lg={6} key={blog.last_update}>
        <Paper className={classes.paper}>
          <Blog title={blog.title} time={blog.last_update} text={blog.text} />
        </Paper>
      </Grid>
    ));
    return renderedBlogs;
  }

  render() {
    return (
      <Grid container spacing={24}>
        {this._renderMemoryPicker()}
        {this._renderBlogs()}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: blogsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  pull: date => dispatch(pullBlog(date)),
});

const HomeRedux =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export default withStyles(styles)(HomeRedux);
