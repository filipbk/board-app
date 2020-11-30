import {BehaviorSubject} from 'rxjs';
import {handleResponse} from '../util/handleResponse';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser')),
);

export const authenticationService = {
  login,
  logout,
  currentUser,
  currentUserValue,
};
function login(username, password) {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  };

  return fetch('/login', options)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}

function currentUser() {
  return currentUserSubject.asObservable();
}

function currentUserValue() {
  return currentUserSubject.value;
}
