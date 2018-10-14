import React from 'react';
import PageBase from './PageBase';
import { RoadmapContainer } from '../containers';

export class RoadmapPage extends PageBase {
  renderComponent() {
    return <RoadmapContainer />;
  }
}