import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { ApplicationBar } from '../components/appbar';
import { BlogPreview, BlogEditor } from '../components/blog';

class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        <ApplicationBar />
        <Grid container spacing={24}>
          <BlogEditor />
          <BlogPreview title='title' tags={[]} time='2018-09-01' text='text' />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

export const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);