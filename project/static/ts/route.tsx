import { LayoutContainer } from './containers';

interface IRoutePoint {
  key: string,
  path: string,
  exact: boolean,
  component: React.ComponentClass,
};

export const routes: IRoutePoint[] = [
  {
    key: 'main_container',
    path: '/home',
    exact: true,
    component: LayoutContainer,
  }
];