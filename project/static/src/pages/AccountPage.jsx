import React from 'react';
import PageBase from './PageBase';
import { AccountContainer } from '../containers';

export class AccountPage extends PageBase {
  renderComponent() {
    return <AccountContainer />;
  }
}