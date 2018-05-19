import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

import { enableTag, disableTag } from '../actions/HomeActions';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit * 0.5,
  },
});

class TagList extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(tag) {
    const { disable, enable } = this.props;
    return () => {
      const selectedTags = this.props.selectedTags || [];
      const isSelected = selectedTags.includes(tag);
      return isSelected ? disable(tag) : enable(tag);
    };
  }

  _renderTag(tag) {
    const { classes } = this.props;
    if (!tag) return;

    const value = tag.replace('_', ' ');
    const isSelected = (this.props.selectedTags || []).includes(tag);
    const label = isSelected ? `${value} ✓` : value;

    if (this.props.readOnly) {
      return <Chip className={classes.chip} label={label} key={value} />
    } else {
      return (
        <Chip
          className={classes.chip}
          label={label}
          key={value}
          onClick={this.handleOnClick(tag)}
        />);
    }
  }

  render() {
    const { tags } = this.props;
    const blogTagsRender = tags.map(tag => this._renderTag(tag));
    return <div>{blogTagsRender}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  enable: (tag) => dispatch(enableTag(tag)),
  disable: (tag) => dispatch(disableTag(tag)),
});

const TagListRedux =
  connect(null, mapDispatchToProps)(TagList)

export default withStyles(styles)(TagListRedux);