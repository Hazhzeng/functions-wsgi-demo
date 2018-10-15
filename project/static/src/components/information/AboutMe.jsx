import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import 'brace/mode/markdown';
import 'brace/theme/github';

class AboutMe extends React.PureComponent {
  render() {
    return (
      <Grid item xs={12} lg={6} className={this.props.classes.grid}>
      </Grid>
    );
  }
}
const styles = (theme) => ({
  grid: {
    marginTop: theme.spacing.unit * 5,
  },
});

export const AboutMeWithStyle = withStyles(styles)(AboutMe);