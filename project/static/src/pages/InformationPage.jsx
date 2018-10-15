import React from 'react';
import PageBase from './PageBase';
import { InformationContainer } from '../containers';

export class InformationPage extends PageBase {
  renderComponent() {
    return <InformationContainer />;
  }
}