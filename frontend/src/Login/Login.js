import React from 'react';
import './Login.css';
import {authenticationService, usersService} from '../services';
import {Form, Input, Button, notification} from 'antd';
import * as jwtDecode from 'jwt-decode';
import {history} from '../util';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      currentUser: null
    };
  }

  componentDidMount() {
    this.checkUserPermissions();
  }

  checkUserPermissions() {
    const token = this.props.match.params.token;
    let currentUser = authenticationService.currentUserValue();

    if (currentUser && currentUser.enabled) {
      history.push('/');
    }

    try {
      jwtDecode(token);
    } catch (e) {
      history.push('/login/failure');
    }

    if (token) {
      authenticationService.login(token);
      currentUser = authenticationService.currentUserValue();
    }

    if (currentUser && currentUser.enabled) {
      history.push('/');
    } else {
      this.setState(currentUser);
    }
  }

  register() {
    const {firstName, lastName, currentUser} = this.state;
    const url = process.env.REACT_APP_API_URL;

    const userBody = {
      firstName,
      lastName,
      id: currentUser.id,
      enabled: currentUser.enabled
    };

    usersService
      .updateUser(userBody, currentUser.id)
      .then(() => window.location.assign(`${url}/auth/google`))
      .catch((error) =>
        notification.error({
          message: 'Error',
          description: error
        })
      );
  }

  render() {
    return (
      <div className='form-wrapper'>
        <Form className='login-form' onFinish={() => this.register()}>
          <Form.Item
            name='firstName'
            rules={[
              {
                required: true,
                message: 'Please input your name!'
              }
            ]}
          >
            <Input
              id='firstName'
              placeholder='Name'
              onChange={(e) => this.setState({firstName: e.target.value})}
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            rules={[
              {
                required: true,
                message: 'Please input your last name!'
              }
            ]}
          >
            <Input
              id='lastName'
              placeholder='Last name'
              onChange={(e) => this.setState({lastName: e.target.value})}
            />
          </Form.Item>

          <Form.Item className='login-btn-wrapper'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
