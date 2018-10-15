import {
  HomePage,
  AccountPage,
  ComposePage,
  RoadmapPage,
  InformationPage,
} from './pages';

export default [
  {
    key: 'about',
    path: '/',
    exact: true,
    component: InformationPage,
  },
  {
    key: 'articles',
    path: '/articles',
    exact: true,
    component: HomePage,
  },
  {
    key: 'account',
    path: '/account',
    exact: true,
    component: AccountPage,
  },
  {
    key: 'compose',
    path: '/compose',
    exact: true,
    component: ComposePage,
  },
  {
    key: 'roadmap',
    path: '/roadmap',
    exact: true,
    component: RoadmapPage,
  },
];