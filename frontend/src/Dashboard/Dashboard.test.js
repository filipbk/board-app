import React from 'react';
import {mount, shallow} from 'enzyme';
import {Spin, Typography} from 'antd';
import {Dashboard} from './Dashboard';

describe('LoginFailure', () => {
  it('renders dashboard page', () => {
    const dashboard = shallow(<Dashboard />);

    expect(dashboard).toBeInTheDocument;
  });

  it('renders dashboard page with title and subtitle', () => {
    const dashboard = mount(<Dashboard />);

    expect(dashboard.find(Typography).at(0).text()).toEqual('Welcome to the offer market!');
    expect(dashboard.find(Typography).at(1).text()).toEqual('Categories:');
  });

  it('shows spinner when loading data', () => {
    const dashboard = shallow(<Dashboard />);
    dashboard.setState({isLoading: true});

    expect(dashboard.find(Spin).length).toEqual(1);
  });
});
