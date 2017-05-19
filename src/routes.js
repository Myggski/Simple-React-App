import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Constants from './util/Constants';

const Routes = [
  {
    key: 'Home',
    type: Constants.RouteTypes.Route,
    path: '/',
    component: Home,
    exact: true
  },
  {
    key: 'Redirect',
    type: Constants.RouteTypes.Redirect,
    to: '/',
    from: '/oldUrl'
  },
  {
    key: 'NotFound',
    component: ErrorPage
  }
];

export default Routes;
