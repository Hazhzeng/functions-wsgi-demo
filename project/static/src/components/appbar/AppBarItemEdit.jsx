import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { EditOutlined } from '@material-ui/icons';
import { view, changeView } from '../../actions/ViewActions';

class AppBarItemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeViewToEditor();
  }

  renderIcon() {
    return <EditOutlined />;
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
    changeViewToEditor: () => dispatch(changeView(view.EDIT_VIEW))
  })
)(AppBarItemEdit)