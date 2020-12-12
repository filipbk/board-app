import {authenticationHeader, handleResponse} from '../util';

class UsersService {
  getUsersPage(query) {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    const fullURL = `${url}?${query}`;
    return fetch(fullURL, {
      method: 'GET',
      headers: authenticationHeader()
    }).then(handleResponse);
  }

  getUser(id) {
    const url = `${process.env.REACT_APP_API_URL}/users/${id}`;
    return fetch(url, {
      method: 'GET',
      headers: authenticationHeader()
    }).then(handleResponse);
  }

  updateUser(userBody, id) {
    const url = process.env.REACT_APP_API_URL;
    return fetch(`${url}/users/${id}`, {
      body: JSON.stringify(userBody),
      method: 'PUT',
      headers: authenticationHeader()
    }).then(handleResponse);
  }
}

const usersService = new UsersService();
export {usersService};
