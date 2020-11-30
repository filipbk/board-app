import React from 'react';
import {mount, shallow} from 'enzyme';
import {Typography} from 'antd';
import {NotFound} from './NotFound';

describe('NotFound', () => {
  it('renders not found page', () => {
    const notFound = shallow(<NotFound />);
    expect(notFound).toBeInTheDocument;
  });

  it('renders not found page with text', () => {
    const notFound = mount(<NotFound />);
    expect(notFound.find(Typography).at(0).text()).toEqual('Page not found');
  });
});
