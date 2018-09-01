import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Menu } from '@material-ui/icons';

export enum EAppBarItemShowLabel {
  onhover,
  onclick,
  always,
  never,
};

export interface IAppBarItemBaseProps {
  label?: string,
  showLabelWhen?: EAppBarItemShowLabel,
  onClickAction?: EventListener,
  onHoverAction?: EventListener,
};

export class AppBarItemBase extends React.PureComponent<IAppBarItemBaseProps> {
  protected renderIcon() /* virtual */ {
    return <Menu />;
  }

  public render() {
    return (
      <IconButton color='inherit' aria-label={this.props.label}>
        {this.renderIcon()}
      </IconButton>
    );
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    foo: { requiredProp: string; optionalProp?: number }
  }
}