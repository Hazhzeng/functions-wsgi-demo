import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit * 0.5,
  },
});

class TagList extends Component {
  constructor(props) {
    super(props);
    this.config = {
      selectedTags: props.selectedTags,
      readOnly: !props.readOnly,
    };
  }

  _renderTag(tag) {
    if (!tag) return;
    const { classes } = this.props;
    const value = tag.replace('_', ' ');
    return <Chip className={classes.chip} label={value} key={value} />
  }

  render() {
    const { tags } = this.props;
    const blogTagsRender = tags.map(tag => this._renderTag(tag));
    return <div>{blogTagsRender}</div>;
  }
}

export default withStyles(styles)(TagList);