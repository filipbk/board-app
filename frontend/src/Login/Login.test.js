import {shallow} from 'enzyme';
import {Login} from './Login';
import React from 'react';
import {Input} from 'antd';

describe('Login', () => {
  let login;

  beforeEach(() => {
    login = shallow(<Login />);
  });

  it('state changes after typing username and password', () => {
    const input = login.find(Input);
    input.at(0).simulate('change', {target: {name: 'username', value: 'a'}});
    input.at(1).simulate('change', {target: {name: 'password', value: 'b'}});
    expect(login.state('username')).toEqual('a');
    expect(login.state('password')).toEqual('b');
  });

  it('login function is called after form submitting', () => {
    const input = login.find(Input);
    const spy = jest.spyOn(login.instance(), 'login');
    input.at(0).simulate('change', {target: {name: 'username', value: 'a'}});
    input.at(1).simulate('change', {target: {name: 'password', value: 'b'}});
    login.find('.login-form').simulate('finish');
    expect(spy).toHaveBeenCalled();
  });
});
