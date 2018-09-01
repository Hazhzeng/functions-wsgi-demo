import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { Menu } from '@material-ui/icons';

class AppBarItemBase extends React.PureComponent {
  renderIcon() /* virtual */ {
    return <Menu />;
  }

  render() {
    return (
      <IconButton color='inherit' aria-label={this.props.label}>
        {this.renderIcon()}
      </IconButton>
    );
  }
}

AppBarItemBase.propTypes = {
  label: PropTypes.string,
  showLabelWhen: PropTypes.oneOf(['always', 'never', 'hover']),
  onClickAction: PropTypes.func,
  onHoverAction: PropTypes.func,
};

export default AppBarItemBase;