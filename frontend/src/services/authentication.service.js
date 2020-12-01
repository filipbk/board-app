import {BehaviorSubject} from 'rxjs';
import * as jwtDecode from 'jwt-decode';

class AuthenticationService {
  constructor() {
    this.userToken = localStorage.getItem('token');
    this.currentUserSubject = this.userToken
      ? new BehaviorSubject(jwtDecode(this.userToken))
      : new BehaviorSubject(null);
  }

  login(token) {
    let user;

    try {
      user = jwtDecode(token);
    } catch (e) {
      this.logout();
      return;
    }

    localStorage.setItem('token', token);
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  currentUser() {
    return this.currentUserSubject.asObservable();
  }

  currentUserValue() {
    return this.currentUserSubject.value;
  }

  getUserToken() {
    return localStorage.getItem('token');
  }
}

const authenticationService = new AuthenticationService();
export {authenticationService};
