import React from 'react';
import { Route } from 'react-router-dom';
import ContentContainer from './containers/ContentContainer';
import HomeContainer from './containers/HomeContainer';

export const RouteConfig = [
  {
    path: "/home",
    exact: false,
    component: HomeContainer,
    pristine: {
      title: 'Roject\'s Home',
    },
  },
  {
    path: "/post",
    exact: false,
    component: ContentContainer,
    pristine: {
      title: 'Post a diary?',
    }
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
