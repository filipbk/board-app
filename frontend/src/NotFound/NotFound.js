import React from 'react';
import {Col, Row, Typography} from 'antd';
import './NotFound.css';
import {authenticationService} from '../services';
import {history} from '../util';

export class NotFound extends React.Component {
  componentDidMount() {
    this.checkUserPermissions();
  }

  checkUserPermissions() {
    const user = authenticationService.currentUserValue();

    if (user && !user.enabled) {
      history.push(`/login/success/${authenticationService.getUserToken()}`);
    }
  }

  render() {
    return (
      <Row className='not-found'>
        <Col span={8} offset={8}>
          <Typography.Title>Page not found</Typography.Title>
        </Col>
      </Row>
    );
  }
}
