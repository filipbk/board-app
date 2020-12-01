import * as React from 'react';
import './Login.css';
import {authenticationService} from '../services';
import {Form, Input, Button} from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue()) {
      props.history.push('/');
    }

    this.state = {
      username: '',
      password: ''
    };

    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div className='form-wrapper'>
        <Form
          className='login-form'
          initialValues={{
            remember: true
          }}
          onFinish={this.login}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input
              placeholder='Username'
              onChange={(e) => this.setState({username: e.target.value})}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              type='password'
              placeholder='Password'
              onChange={(e) => this.setState({password: e.target.value})}
            />
          </Form.Item>

          <Form.Item className='login-btn-wrapper'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  login() {
    const {username, password} = this.state;
    console.log(username, password);
  }
}

export {Login};
