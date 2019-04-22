import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './components/login';
import Home from './components/home';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/home" component={Home} />
      <Route exact path="/" component={Login} />
      <Redirect from="*" exact to="/" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
