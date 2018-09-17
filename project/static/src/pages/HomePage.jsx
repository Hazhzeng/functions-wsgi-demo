import React from 'react';
import PageBase from './PageBase';
import { BlogContainer } from '../containers';

export class HomePage extends PageBase {
  renderComponent() {
    return <BlogContainer />;
  }
}