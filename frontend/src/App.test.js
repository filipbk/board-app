import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

describe('App', () => {
  it('renders learn react link', () => {
    const app = shallow(<App />);
    expect(app).toBeInTheDocument;
  });
});
