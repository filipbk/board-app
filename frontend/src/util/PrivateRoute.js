import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authenticationService} from '../services';
import {history} from './history';

const isUserEnabled = (user) => user && !user.enabled;

export const PrivateRoute = ({component: Component, requiredRole, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue();
      const hasRequiredRole =
        !requiredRole || authenticationService.currentUserHasRole(requiredRole);

      if (isUserEnabled(currentUser) || !hasRequiredRole) {
        history.push(`/login/success/${authenticationService.getUserToken()}`);
      } else if (!currentUser) {
        return <Redirect to={{pathname: '/', state: {from: props.location}}} />;
      }

      return <Component {...props} />;
    }}
  />
);
