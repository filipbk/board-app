import React from 'react';
import {render} from '@testing-library/react';
import {AppHeaderWithRouter} from './AppHeader';
import {BrowserRouter} from 'react-router-dom';
import {authenticationService} from '../services';
import {BehaviorSubject} from 'rxjs';
import {mount} from 'enzyme';

test('renders app header with title', () => {
  const location = {pathname: '/'};
  const {getByText} = render(
    <BrowserRouter>
      <AppHeaderWithRouter location={location} />
    </BrowserRouter>,
  );
  const linkElement = getByText(/board app/i);
  expect(linkElement).toBeInTheDocument();
});

test('user has logged in', () => {
  const spy = jest
    .spyOn(authenticationService, 'currentUser')
    .mockImplementation(() =>
      new BehaviorSubject({token: 'aaa', name: 'Bob'}).asObservable(),
    );
  const {getByText} = render(
    <BrowserRouter>
      <AppHeaderWithRouter location={location} />
    </BrowserRouter>,
  );
  const logoutElement = getByText(/logout/i);
  expect(logoutElement).toBeInTheDocument();
  expect(spy).toHaveBeenCalled();
});

test('user has not logged in', () => {
  const spy = jest
    .spyOn(authenticationService, 'currentUser')
    .mockImplementation(() => new BehaviorSubject(null).asObservable());
  const {getByText} = render(
    <BrowserRouter>
      <AppHeaderWithRouter location={location} />
    </BrowserRouter>,
  );
  const loginElement = getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
  expect(spy).toHaveBeenCalled();
});

it('logout', () => {
  const spy = jest
    .spyOn(authenticationService, 'currentUser')
    .mockImplementation(() =>
      new BehaviorSubject({token: 'aaa', name: 'Bob'}).asObservable(),
    );
  const header = mount(
    <BrowserRouter>
      <AppHeaderWithRouter location={location} />
    </BrowserRouter>,
  );
  let logoutButton = header.find('[data-testid="logout-btn"]');
  logoutButton.at(3).simulate('click');
  expect(header.toBeVisible);
  expect(spy).toHaveBeenCalled();
});
