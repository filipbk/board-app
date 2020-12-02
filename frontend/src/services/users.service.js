import {handleResponse} from '../util';
import {authenticationService} from './authentication.service';

class UsersService {
  updateUser(userBody, id) {
    const url = process.env.REACT_APP_API_URL;
    return fetch(`${url}/users/${id}`, {
      body: JSON.stringify(userBody),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticationService.getUserToken()}`
      }
    }).then(handleResponse);
  }
}

const usersService = new UsersService();
export {usersService};
