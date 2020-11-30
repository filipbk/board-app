import {shallow} from 'enzyme';
import {Login} from './Login';
import React from 'react';
import {Input} from 'antd';
import {authenticationService} from '../services';

describe('Login', () => {
  let login;

  beforeEach(() => {
    login = login = shallow(
      <Login
        match={{
          params: {
            token:
              'eyJpZCI6NywidGhpcmRQYXJ0eUlkIjoiMTExMjExNjAxMzgxNDc1NDYyOTY1IiwicHJvdmlkZXIiOiJnb29nbGUiLCJlbWFpbCI6ImZpbGlwcDk3M0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJGaWxpcCIsImxhc3ROYW1lIjoiQm9nYXRrbyIsImVuYWJsZWQiOnRydWUsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNTg5NDA2MjM0LCJleHAiOjE1ODk0MTM0MzR9.vw17c_l5qooYwU6Y5iA29OrSSPHaaVYD5XdKUjkmNwo'
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

  it('register function is called after form submitting', () => {
    const registerSpy = jest.spyOn(authenticationService, 'register');
    login.setState({currentUser: {id: 5}});
    const input = login.find(Input);
    const spy = jest.spyOn(login.instance(), 'register');
    input.at(0).simulate('change', {target: {name: 'firstName', value: 'a'}});
    input.at(1).simulate('change', {target: {name: 'lastName', value: 'b'}});
    login.find('.login-form').simulate('finish');
    expect(spy).toHaveBeenCalled();
    expect(registerSpy).toHaveBeenCalledWith({
      firstName: 'a',
      lastName: 'b',
      id: 5
    });
  });
});
