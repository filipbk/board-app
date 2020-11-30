import {shallow} from 'enzyme';
import {Login} from './Login';
import React from 'react';
import {Input} from 'antd';

describe('Login', () => {
  let login;

  beforeEach(() => {
    login = login = shallow(
      <Login
        match={{
          params: {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aGlyZFBhcnR5SWQiOiIxMTEyMTE2MDEzODE0NzU0NjI5NjUiLCJwcm92aWRlciI6Imdvb2dsZSIsImVtYWlsIjoiZmlsaXBwOTczQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6bnVsbCwibGFzdE5hbWUiOm51bGwsImVuYWJsZWQiOmZhbHNlLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTU4OTM1OTMwOSwiZXhwIjoxNTg5MzY2NTA5fQ.v2oJXZMvtHz_9ekV_UCL-BjT7-DQbzsXga2smUK_T2U'
          }
        }}
      />
    );
  });

  it('state changes after typing username and password', () => {
    const input = login.find(Input);
    input.at(0).simulate('change', {target: {name: 'firstName', value: 'a'}});
    input.at(1).simulate('change', {target: {name: 'lastName', value: 'b'}});
    expect(login.state('firstName')).toEqual('a');
    expect(login.state('lastName')).toEqual('b');
  });

  it('login function is called after form submitting', () => {
    const input = login.find(Input);
    const spy = jest.spyOn(login.instance(), 'register');
    input.at(0).simulate('change', {target: {name: 'firstName', value: 'a'}});
    input.at(1).simulate('change', {target: {name: 'lastName', value: 'b'}});
    login.find('.login-form').simulate('finish');
    expect(spy).toHaveBeenCalled();
  });
});
