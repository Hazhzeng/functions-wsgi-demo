import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { TimelineOutlined, TimelineSharp } from '@material-ui/icons';
import { view, changeView } from '../../actions/ViewActions';
import { changeRoute } from '../../actions/RouteActions';

class AppBarItemRoadmap extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeViewToBlogViewer();
    this.props.changeRoute('/roadmap');
  }

  renderIcon() {
    if (this.props.view === view.BLOG_VIEW) {
      return <TimelineSharp />;
    }
    return <TimelineOutlined />;
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
  state => ({
    view: state.view.currentView,
  }),
  dispatch => ({
    changeViewToBlogViewer: () => dispatch(changeView(view.BLOG_VIEW)),
    changeRoute: routePath => dispatch(changeRoute(routePath)),
  })
)(AppBarItemRoadmap)