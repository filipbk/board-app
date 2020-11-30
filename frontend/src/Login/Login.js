import * as React from 'react';
import './Login.css';
import {authenticationService} from '../services';
import {Form, Input, Button} from 'antd';
import * as jwt_decode from 'jwt-decode';
import {history} from '../util/history';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const currentUser = authenticationService.currentUserValue();
    const token = props.match.params.token;

    try {
      jwt_decode(token);
    } catch (e) {
      history.push('/login/failure');
    }

    this.state = {
      firstName: '',
      lastName: ''
    };

    if (currentUser && currentUser.enabled) {
      history.push('/');
    } else if (token) {
      authenticationService.login(token);
    }

    this.register = this.register.bind(this);
  }

  render() {
    return (
      <div className='form-wrapper'>
        <Form
          className='login-form'
          initialValues={{
            remember: true
          }}
          onFinish={this.register}
        >
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

  register() {
    const {firstName, lastName, currentUser} = this.state;
    let userBody = Object.assign({}, currentUser, {firstName, lastName});

    fetch('/users', {
      body: JSON.stringify(userBody),
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}

export {Login};
