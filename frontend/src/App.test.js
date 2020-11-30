import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

describe('App', () => {
  it('renders app component', () => {
    const app = shallow(<App />);
    expect(app).toBeInTheDocument;
  });
});
