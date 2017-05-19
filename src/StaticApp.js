import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Routes from './routes';
import Constants from './util/Constants.js';

const StaticApp = () => (
<div className="App">
  <Switch>
    {
      Routes.map(route => {
        if (route.type === Constants.RouteTypes.Redirect) {
          return (<Redirect {...route} />);
        }
        return (<Route {...route} />);
      })
    }
  </Switch>
</div>
);

export default StaticApp;
