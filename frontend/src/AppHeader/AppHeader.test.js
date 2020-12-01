import React from 'react';
import {AppHeaderWithRouter} from './AppHeader';
import {BrowserRouter, Link} from 'react-router-dom';
import {authenticationService} from '../services';
import {BehaviorSubject} from 'rxjs';
import {mount} from 'enzyme';
import {Button} from 'antd';

describe('AppHeader', () => {
  it('renders app header link to main page', () => {
    const appHeader = mount(
      <BrowserRouter>
        <AppHeaderWithRouter />
      </BrowserRouter>
    );
    expect(appHeader.find(Link).at(0).text()).toEqual('Board App');
  });

  test('renders app header for logged in user', () => {
    const spy = jest
      .spyOn(authenticationService, 'currentUser')
      .mockImplementation(() =>
        new BehaviorSubject({token: 'aaa', name: 'Bob'}).asObservable()
      );
    const appHeader = mount(
      <BrowserRouter>
        <AppHeaderWithRouter />
      </BrowserRouter>
    );
    expect(appHeader.find(Button).at(0).text()).toEqual('Logout');
    expect(spy).toHaveBeenCalled();
  });

  test('renders app header for not logged in user', () => {
    const spy = jest
      .spyOn(authenticationService, 'currentUser')
      .mockImplementation(() => new BehaviorSubject(null).asObservable());
    const appHeader = mount(
      <BrowserRouter>
        <AppHeaderWithRouter />
      </BrowserRouter>
    );
    expect(appHeader.find(Link).at(1).text()).toEqual('Log in');
    expect(appHeader.find(Link).at(2).text()).toEqual('Signup');
    expect(spy).toHaveBeenCalled();
  });

  it('log user out properly', () => {
    const spy = jest
      .spyOn(authenticationService, 'currentUser')
      .mockImplementation(() =>
        new BehaviorSubject({token: 'aaa', name: 'Bob'}).asObservable()
      );
    const appHeader = mount(
      <BrowserRouter>
        <AppHeaderWithRouter />
      </BrowserRouter>
    );
    const logoutSpy = jest.spyOn(authenticationService, 'logout');
    appHeader.find(Button).simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
  });
});
