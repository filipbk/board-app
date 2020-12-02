import {handleResponse} from '../util';

class UsersService {
  updateUser(userBody, id) {
    const url = process.env.REACT_APP_API_URL;
    return fetch(`${url}/users/${id}`, {
      body: JSON.stringify(userBody),
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
    }).then(handleResponse);
  }
}

const usersService = new UsersService();
export {usersService};
