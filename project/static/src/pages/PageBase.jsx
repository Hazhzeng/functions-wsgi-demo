import React from 'react';
import Grid from '@material-ui/core/Grid';
import { AppbarContainer } from '../containers';

export class PageBase extends React.PureComponent {
  renderIf() {
    throw new Error('renderIf needs to be implemented');
  }

  renderComponent() {
    throw new Error('renderComponent needs to be implemented');
  }

  render() {
    return (
      <Grid container spacing={24}>
        <AppbarContainer />
        {this.renderIf() && this.renderComponent()}
      </Grid>
    )
  }
}

export default PageBase;