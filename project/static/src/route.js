import { HomePage, AccountPage } from './pages';

export default [
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
  }
];