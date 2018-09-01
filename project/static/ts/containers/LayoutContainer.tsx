import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationBar } from '../components/appbar';
import { BlogPreview } from '../components/blog';

class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        <ApplicationBar />;
        <BlogPreview title='title' tags={[]} time='2018-09-01' text='text' />;
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);