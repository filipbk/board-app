import React from 'react';
import {mount, shallow} from 'enzyme';
import {Typography} from 'antd';
import {LoginFailure} from './LoginFailure';

describe('LoginFailure', () => {
  it('renders login failure page', () => {
    const loginFailure = shallow(<LoginFailure />);
    expect(loginFailure).toBeInTheDocument;
  });

  it('renders login failure page with text', () => {
    const loginFailure = mount(<LoginFailure />);
    expect(loginFailure.find(Typography).at(0).text()).toEqual('Login failed');
  });
});
