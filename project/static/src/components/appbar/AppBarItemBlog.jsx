import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { CalendarTodayOutlined } from '@material-ui/icons';
import { view, changeView } from '../../actions/ViewActions';

class AppBarItemBlog extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeViewToBlogViewer();
  }

  renderIcon() {
    return <CalendarTodayOutlined />;
  }

  render() {
    return (
      <IconButton
        color='inherit'
        aria-label={this.props.label}
        onClick={this.handleClick}
      >
        {this.renderIcon()}
      </IconButton>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    changeViewToBlogViewer: () => dispatch(changeView(view.BLOG_VIEW))
  })
)(AppBarItemBlog)