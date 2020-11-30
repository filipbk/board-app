import React from 'react';
import {Col, Row, Typography} from 'antd';
import './NotFound.css';
import {authenticationService} from '../services';
import {history} from '../util/history';

class NotFound extends React.Component {
  constructor(props) {
    super(props);

    const user = authenticationService.currentUserValue();
    console.log(user);
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

export {NotFound};
