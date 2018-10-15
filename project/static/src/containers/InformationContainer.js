import React from 'react';
import { connect } from 'react-redux';
import { AboutMe } from '../components/information';

class Information extends React.PureComponent {
  render() {
    return <AboutMe />;
  }
}

export const InformationContainer = connect()(Information);