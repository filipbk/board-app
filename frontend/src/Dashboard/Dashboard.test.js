import React from 'react';
import {mount, shallow} from 'enzyme';
import {Card, Spin, Typography} from 'antd';
import {Dashboard} from './Dashboard';

describe('LoginFailure', () => {
  it('renders dashboard page', () => {
    const dashboard = shallow(<Dashboard />);

    expect(dashboard).toBeInTheDocument;
  });

  it('renders dashboard page with title and subtitle', () => {
    const dashboard = mount(<Dashboard />);

    expect(dashboard.find(Typography).at(0).text()).toEqual(
      'Welcome to the announcement service!'
    );
    expect(dashboard.find(Typography).at(1).text()).toEqual('Categories:');
  });

  it('renders properly categories list', () => {
    const dashboard = mount(<Dashboard />);
    const categories = [
      {name: 'A', imageUrl: ''},
      {name: 'B', imageUrl: ''}
    ];
    dashboard.setState({categories, isLoading: false});

    expect(dashboard.find(Card).length).toEqual(2);
    expect(dashboard.find('.ant-card-meta-title').at(0).text()).toEqual('A');
    expect(dashboard.find('.ant-card-meta-title').at(1).text()).toEqual('B');
  });

  it('shows spinner when loading data', () => {
    const dashboard = mount(<Dashboard />);
    dashboard.setState({isLoading: true});

    expect(dashboard.find(Spin).length).toEqual(1);
  });
});
