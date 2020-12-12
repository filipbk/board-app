import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authenticationService} from '../services';
import {history} from './history';

export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue();

      if (currentUser && !currentUser.enabled) {
        history.push(`/login/success/${authenticationService.getUserToken()}`);
      } else if (!currentUser) {
        return <Redirect to={{pathname: '/', state: {from: props.location}}} />;
      }

      return <Component {...props} />;
    }}
  />
);
