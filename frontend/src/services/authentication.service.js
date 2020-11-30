import {BehaviorSubject} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

const userToken = localStorage.getItem('currentUser');
const currentUserSubject = userToken
  ? new BehaviorSubject(jwt_decode(userToken))
  : new BehaviorSubject(null);

export const authenticationService = {
  login: function (token) {
    let user;

    try {
      user = jwt_decode(token);
    } catch (e) {
      this.logout();
      return;
    }

    localStorage.setItem('currentUser', token);
    currentUserSubject.next(user);
  },

  logout: function () {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
  },

  currentUser: function () {
    return currentUserSubject.asObservable();
  },

  currentUserValue: function () {
    return currentUserSubject.value;
  },

  getUserToken: function () {
    return localStorage.getItem('currentUser');
  }
};
