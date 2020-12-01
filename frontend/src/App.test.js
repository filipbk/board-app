import React from 'react';
import {App} from './App';
import {shallow, mount} from 'enzyme';
import {MemoryRouter} from 'react-router';
import {NotFound} from './NotFound';

describe('App', () => {
  it('renders app component', () => {
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
  });
});
