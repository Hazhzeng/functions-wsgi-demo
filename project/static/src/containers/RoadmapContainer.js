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
    })).sort((t1, t2) => {
      if (t1.date == t2.date) return 0;
      return t1.date < t2.date ? 1 : -1;
    });
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