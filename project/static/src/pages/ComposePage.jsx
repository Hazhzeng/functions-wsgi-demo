import React from 'react';
import PageBase from './PageBase';
import { ComposeContainer } from '../containers';

export class ComposePage extends PageBase {
  renderComponent() {
    return <ComposeContainer />;
  }
}