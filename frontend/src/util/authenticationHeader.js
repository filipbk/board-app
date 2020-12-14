import {authenticationService} from '../services';

export function authenticationHeader() {
  const currentUser = authenticationService.currentUserValue();

  if (currentUser) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authenticationService.getUserToken()}`
    };
  } else {
    return {'Content-Type': 'application/json'};
  }
}
