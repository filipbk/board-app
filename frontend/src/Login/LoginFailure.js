import React from 'react';
import {Col, Row, Typography} from 'antd';
import {authenticationService} from '../services';
import './LoginFailure.css';
import {history} from '../util';

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
      <Row className='login-failure'>
        <Col span={8} offset={8}>
          <Typography.Title>Login failed</Typography.Title>
        </Col>
      </Row>
    );
  }
}

export {LoginFailure};
