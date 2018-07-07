import React from 'react';
import { Route } from 'react-router-dom';

import ContentContainer from './containers/ContentContainer';
import HomeContainer from './containers/HomeContainer';
import HistoryContainer from './containers/HistoryContainer';
import InfoContainer from './containers/InfoContainer';
import LoginContainer from './containers/LoginContainer';
import LogoutContainer from './containers/LogoutContainer';

export const RouteConfig = [
  {
    path: "/home",
    exact: false,
    component: HomeContainer,
  },
  {
    path: "/history",
    exact: false,
    component: HistoryContainer,
  },
  {
    path: "/post",
    exact: false,
    component: ContentContainer,
  },
  {
    path: "/info",
    exact: false,
    component: InfoContainer,
  },
  {
    path: "/login",
    exact: false,
    component: LoginContainer,
  },
  {
    path: "/logout",
    exact: false,
    component: LogoutContainer,
  },
];

export const RouteWithSubRoutes = route => {
  const renderRoute = props => (
    <route.component
      {...props}
      routes={route.routes}
      pristine={route.pristine}
    />
  );

  return <Route path={route.path} render={renderRoute} exact={route.exact} />;
};

export default {
  RouteConfig,
  RouteWithSubRoutes,
};
