import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { EditOutlined, EditSharp } from '@material-ui/icons';
import { view, changeView } from '../../actions/ViewActions';
import { changeRoute } from '../../actions/RouteActions';
import { status } from '../../actions/AccountActions';

class AppBarItemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeViewToEditor();
    this.props.changeRoute('/compose');
  }

  renderIcon() {
    if (this.props.view === view.EDIT_VIEW) {
      return <EditSharp />;
    }
    return <EditOutlined />;
  }

  render() {
    if (this.props.status !== status.LOGGED_IN) {
      return null;
    }

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
    status: state.account.status,
  }),
  dispatch => ({
    changeViewToEditor: () => dispatch(changeView(view.EDIT_VIEW)),
    changeRoute: routePath => dispatch(changeRoute(routePath)),
  })
)(AppBarItemEdit)