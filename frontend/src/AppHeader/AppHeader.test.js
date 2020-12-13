import React from 'react';
import {AppHeader} from './AppHeader';
import {Link} from 'react-router-dom';
import {authenticationService} from '../services';
import {BehaviorSubject} from 'rxjs';
import {shallow} from 'enzyme';
import {Button} from 'antd';

describe('AppHeader', () => {
  it('renders app header link to main page', () => {
    const appHeader = shallow(<AppHeader />);

    expect(appHeader.find(Link).at(0).text()).toEqual('Board App');
  });

  it('renders app header for logged in user', () => {
    const spy = jest
      .spyOn(authenticationService, 'currentUser')
      .mockImplementation(() => new BehaviorSubject({firstName: 'Bob'}).asObservable());
    const appHeader = shallow(<AppHeader />);

    expect(appHeader.find('#logout-button').at(0)).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });

  it('renders app header for not logged in user', () => {
    const spy = jest
      .spyOn(authenticationService, 'currentUser')
      .mockImplementation(() => new BehaviorSubject(null).asObservable());
    const appHeader = shallow(<AppHeader />);

    expect(appHeader.find('#login-button').at(0)).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });

  it('log user out properly', () => {
    const spy = jest
      .spyOn(authenticationService, 'currentUser')
      .mockImplementation(() => new BehaviorSubject({firstName: 'Bob'}).asObservable());
    const appHeader = shallow(<AppHeader />);
    const logoutSpy = jest.spyOn(authenticationService, 'logout');

    appHeader.find(Button).simulate('click');

    expect(spy).toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
  });
});
