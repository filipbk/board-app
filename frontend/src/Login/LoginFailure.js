import React from 'react';
import {Typography} from 'antd';
import {authenticationService} from '../services';
import {history} from '../util/history';

class LoginFailure extends React.Component {
  constructor(props) {
    super(props);
    const user = authenticationService.currentUserValue();

    if (user && !user.enabled) {
      history.push(`/login/success/${authenticationService.getUserToken()}`);
    } else if (user) {
      history.push('/');
    }
  }
  render() {
    return (
      <div>
        <Typography.Title>Login failed</Typography.Title>
      </div>
    );
  }
}

export {LoginFailure};
