import React from 'react';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';

class RoadmapBoard extends React.Component {
  renderTagList(tagArray) {
    return (
      tagArray.map(tag => (
        <Chip
          key={tag}
          label={tag}
          className={this.props.classes.chip}
          color="primary"
          variant="outlined"
        />
      ))
    );
  }

  render() {
    return (
      <Grid item xs={12} lg={6} className={this.props.classes.grid}>
        <Stepper orientation="vertical">
          {this.props.tags.map(tag => (
            <Step key={tag.date}>
              <StepLabel>{tag.date}</StepLabel>
              <StepContent>{this.renderTagList(tag.set)}</StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>
    );
  }
}

RoadmapBoard.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
};

const styles = theme => ({
  grid: {
    marginTop: theme.spacing.unit * 5,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  }
});

export default withStyles(styles)(RoadmapBoard);