import React from 'react';
import {App} from './App';
import {shallow, mount} from 'enzyme';
import {MemoryRouter} from 'react-router';
import {NotFound} from './NotFound';
import {Login} from './Login';
import {Dashboard} from './Dashboard';

describe('App', () => {
  it('renders learn react link', () => {
    const app = shallow(<App />);
    expect(app).toBeInTheDocument;
  });

  it('invalid path should redirect to page not found', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(NotFound)).toHaveLength(1);
    expect(wrapper.find(Login)).toHaveLength(0);
  });

  it('valid path should not redirect to page not found', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(NotFound)).toHaveLength(0);
    expect(wrapper.find(Dashboard)).toHaveLength(1);
  });
});
