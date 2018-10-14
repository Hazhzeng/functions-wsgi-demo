import React from 'react';
import { connect } from 'react-redux';
import { getAllTags } from '../actions/BlogActions';
import { RoadmapBoard } from '../components/roadmap';

class Roadmap extends React.Component {
  componentDidMount() {
    this.props.getAllTags();
  }

  render() {
    const tags = Object.keys(this.props.tagsByDate).map(date => ({
      date,
      set: this.props.tagsByDate[date],
    }));
    return <RoadmapBoard tags={tags} />;
  }
}

export const RoadmapContainer = connect(
  state => ({
    tagsByDate: state.blog.tagsByDate,
  }),
  dispatch => ({
    getAllTags: () => dispatch(getAllTags()),
  })
)(Roadmap);