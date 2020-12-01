import {BehaviorSubject} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {handleResponse} from '../util';

class AuthenticationService {
  constructor() {
    this.userToken = localStorage.getItem('currentUser');
    this.currentUserSubject = this.userToken
      ? new BehaviorSubject(jwt_decode(this.userToken))
      : new BehaviorSubject(null);
  }

  login(token) {
    let user;

    try {
      user = jwt_decode(token);
    } catch (e) {
      this.logout();
      return;
    }

    localStorage.setItem('currentUser', token);
    this.currentUserSubject.next(user);
  }

  register(userBody) {
    const url = process.env.REACT_APP_API_URL;
    return fetch(`${url}/users`, {
      body: JSON.stringify(userBody),
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
    }).then(handleResponse);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  currentUser() {
    return this.currentUserSubject.asObservable();
  }

  currentUserValue() {
    return this.currentUserSubject.value;
  }

  getUserToken() {
    return localStorage.getItem('currentUser');
  }
}

const authenticationService = new AuthenticationService();
export {authenticationService};
