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
});

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    const t = new Date();
    this.state = {
      isDateValid: true,
      date: `${dateToString(t)}`
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.pullSubmit = _.debounce(this.pullSubmit, 1000);

    /* API call */
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
  loading: uiSelector(state).loading,
});

const mapDispatchToProps = (dispatch) => ({
  pull: date => dispatch(pullBlog(date)),
});

const HomeRedux =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export default withStyles(styles)(HomeRedux);
